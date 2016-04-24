local lapis = require("lapis")
local app = lapis.Application()
local api = require 'burgerapi'
app:enable("etlua")
app.layout = require "views.layout"
local respond_to = (require 'lapis.application').respond_to


local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json

app:before_filter(function(self)
  --always load these as they are in the sidebar
  self.top10 = api:GetTopBurgers(10)
  self.recent10 = api:GetRecentBurgers(0,9)

end)

app:get("index", "/", function(self)
  --return "Welcome to Lapis " .. require("lapis.version")
  --load all burgerapi
  if self.params.page then
    self.burgers = api:GetRecentBurgers(self.params.page*10, self.params.page*10+9)
  else
    self.burgers = self.recent10
  end
  return {render = true}
end)

app:get("top10", "/top10", function(self)
  --return "Welcome to Lapis " .. require("lapis.version")
  --load all burgerapi
  self.burgers = self.top10

  return {render = 'index'}
end)

app:get("faq", "/faq", function(self)
  --return "Welcome to Lapis " .. require("lapis.version")
  --load all burgerapi
  return 'faq'
end)

app:get('nearest','/api/nearest/:lat/:long',function(self)
  local lat = self.params.lat or 0
  local long = self.params.long or 0
  local distance = self.params.distance or 10
  local nearestBurgers = api:GetNearestBurgers(lat, long, distance)


  return {json = nearestBurgers}

end)

local function ShowLogin(self)
  return {render=true}
end

local function DoLogin(self)
  local salt = "lalalalalala12345"
  if not self.params.username then
    return 'no username'
  end
  if not self.params.password then
    return 'no password!'
  end
  if self.params.username ~= 'kraftman' then
    return 'bad username'
  end

  local hash = '4c86dc39dc6c2d9012e62213c6cb5aa5'
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

app:match('login','/login',respond_to({GET = ShowLogin,POST = DoLogin}))
app:get('logout', '/logout', function(self)
  self.session.loggedIn = false
  return {redirect_to = self:url_for("index")}
end)


require 'burger':Register(app)


return app
