local lapis = require("lapis")
local app = lapis.Application()
local api = require 'burgerapi'
app:enable("etlua")
app.layout = require "views.layout"
local respond_to = (require 'lapis.application').respond_to


local function DaysAgo(_,epochTime)
  local value, unit
  if epochTime < 86400 then
   return 'Today'
  elseif epochTime < 2592000 then
    value, unit = math.floor(epochTime/60/60/24), 'day'
  elseif epochTime < 31536000 then
    value, unit = math.floor(epochTime/60/60/24/30), 'month'
  else
    value, unit = math.floor(epochTime/60/60/24/365), 'year'
  end

  if value > 1 then
    return value..' '..unit..'s ago'
  else
    return value..' '..unit..' ago'
  end
end

app:before_filter(function(self)
  --always load these as they are in the sidebar
  self.top10 = api:GetTopBurgers(10)
  self.recent10 = api:GetRecentBurgers(0,9)
  self.params.page = self.params.page and self.params.page or 1

  -- util functions for etlua
  self.DaysAgo = DaysAgo

end)

app:get("index", "/", function(self)

  --load all burgerapi
  local page = self.params.page - 1
  self.burgers = api:GetRecentBurgers(page*10, page*10+9)

  self.feed = true
  return {render = true}
end)

app:get("all", '/all', function(self) end)

app:get("top10", "/top10", function(self)

  local page = self.params.page - 1
  self.burgers = api:GetBestBurgers(page*10, page*10+9)
  self.page_title = 'BEST BURGERS'

  return {render = 'index'}
end)

app:get("bottom10", "/bottom10", function(self)

  local page = self.params.page - 1
  self.burgers = api:GetWorstBurgers(page*10, page*10+9)

  self.page_title = 'WORST BURGERS'

  return {render = 'index'}
end)

app:get("faq", "/faq", function(self)
  return 'faq'
end)

app:get("api-delete",'/api/delete/:burgerID',function(self)
  if not self.session.loggedIn then
    return {status = 401}
  end

  local ok, err = api:DeleteBurger(self.params.burgerID)
  if ok then
    return {redirect_to = self:url_for("index")}
  else
    return 'error deleting burger: ',err
  end

end)

app:get('delete','/delete/:burgerID', function(self)
  return {render = true}
end)

app:get('nearest','/api/nearest/:lat/:long',function(self)
  local lat = self.params.lat or 0
  local long = self.params.long or 0
  local distance = self.params.distance or 10
  local nearestBurgers = api:GetNearestBurgers(lat, long, distance)
  return {json = nearestBurgers}

end)

app:get('top', '/api/top/:count', function(self)
  local offset = 0
  local count = self.params.count or 10
  local topBurgers = api:GetTopBurgers(offset, offset+count)
  return {json = topBurgers}
end)

app:get('recent', '/api/recent/:count', function(self)
  local offset = 0
  local count = self.params.count or 10
  local topBurgers = api:GetRecentBurgers(offset, offset+count)
  return {json = topBurgers}
end)

local function ShowLogin(self)
  return {render=true}
end

local function DoLogin(self)
  local salt = "lalalalalala12345"
  if not self.params.username then
    return 'no username'
  end
  self.params.username = self.params.username:lower()

  if not self.params.password then
    return 'no password!'
  end
  if self.params.username ~= 'kraftman' then
    return 'bad username'
  end

  local hash = os.getenv("PASSWORD_HASH");
  ngx.log(ngx.ERR, 'hash:, ', hash)
  local digest = ngx.md5(salt..self.params.password)

  if digest == hash then
    self.session.loggedIn = true
    self.session.username = self.params.username
    print('logged in!')
    return {redirect_to = self:url_for("index")}
  else
   return 'bad login'
 end
end

local function ShowMap()
  return {render = true}
end

app:get('map','/map', ShowMap)
app:match('login','/login',respond_to({GET = ShowLogin,POST = DoLogin}))
app:get('logout', '/logout', function(self)
  self.session.loggedIn = false
  return {redirect_to = self:url_for("index")}
end)

local function FixBurgers(self)
  if not self.session.loggedIn then
    return 'not logged in'
  end

  local ok, err = api:FixBurgers()
  if ok then
    return 'done'
  else
    return 'fail: '..err
  end

end

app:get('fixburgers','/fixburgers', FixBurgers)


require 'burger':Register(app)


return app
