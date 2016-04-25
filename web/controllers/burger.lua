

local M = {}

local respond_to = (require 'lapis.application').respond_to
local api = require 'burgerapi'
local magick = require("magick")


local uuid = require 'uuid'

local extTable = {}
extTable['jpg'] = 'image/jpeg'
extTable['jpeg'] = 'image/jpeg'
extTable['png'] = 'image/png'
extTable['bmp'] = 'image/bmp'
extTable['svg'] = 'image/svg'
extTable['gif'] = 'image/gif'

local function BurgerForm(self)
  if not self.session.loggedIn then
    return 'must be logged in to submit burgers!'
  end
  if self.params.burgerID then
    self.burger = api:GetBurger(self.params.burgerID)
  else
    self.burger = {}
  end
  return {render = 'burgerform'}
end

local function WriteImage(self, burgerInfo)
  local imageExtension = self.params.burgerImage.filename:match('.+%.(.-)$')
  if not extTable[imageExtension] then
    return
  end

  local fileName = burgerInfo.burgerID..'.'..imageExtension
  local iconName150 = burgerInfo.burgerID..'-ico150.'..imageExtension
  local savePath = 'static/uploads/'

  burgerInfo['img:filename'] = fileName
  burgerInfo['img:iconName'] = iconName150
  local file, err = io.open(savePath..fileName, 'w+')

  if err then
    ngx.log(ngx.ERR, 'error openign file: ', err)
  end

  file:write(self.params.burgerImage.content)
  file:close()

  magick.thumb(savePath..fileName, "150x150", savePath..iconName150)

end

local function BurgerSubmit(self)
  if not self.session.loggedIn then
    return 'must be logged in to submit burgers!'
  end


  local dateEaten = os.time()

  if self.params.dateEaten then
    local year, month, day = self.params.dateEaten:match('(%d%d%d%d)%-(%d%d)%-(%d%d)')
    if day then
      dateEaten = os.time({day = day, month = month, year = year})
    else
      ngx.log(ngx.ERR, 'unable to parse date: ', self.params.dateEaten)
    end
  end

  local burgerInfo = {
    meatRating = self.params.meatRating or 0,
    bunRating = self.params.bunRating or 0,
    toppingRating = self.params.toppingRating or 0,
    sideRating = self.params.sideRating or 0,
    restaurantName = self.params.restaurantName or 'RName',
    burgerName = self.params.burgerName or 'BName',
    lat = self.params.lat or 0,
    long = self.params.long or 0,
    burgerID = uuid.generate_random(),
    dateEaten = dateEaten
  }

  if self.params.burgerID then
    burgerInfo.burgerID = self.params.burgerID
    burgerInfo.createdAt = os.time()
  end

  if self.params.burgerImage then
    WriteImage(self, burgerInfo)
  end

  api:CreateBurgerPost(burgerInfo)

  return {redirect_to = self:url_for("index")}
end

local function ViewBurger(self)

  self.burger = api:GetBurger(self.params.burgerID)
  if not self.burger then
    return { render = "error404", status = 404}
  end
  return {render = 'burger'}
end

function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
  app:match('update','/submit/:burgerID',respond_to({GET = BurgerForm,POST = BurgerSubmit}))

  app:get("viewburger", "/burger/:burgerID", ViewBurger)
end

return M
