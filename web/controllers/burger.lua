

local M = {}

local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json
local respond_to = (require 'lapis.application').respond_to
local api = require 'burgerapi'
local magick = require("magick")

local resty_sha1 = require "resty.sha1"
local upload = require "resty.upload"

local uuid = require 'uuid'

local extTable = {}
extTable['jpg'] = 'image/jpeg'
extTable['jpeg'] = 'image/jpeg'
extTable['png'] = 'image/png'
extTable['bmp'] = 'image/bmp'
extTable['svg'] = 'image/svg'
extTable['gif'] = 'image/gif'

local function BurgerForm()
  return {render = 'burgerform'}
end

local function WriteImage(self, burgerInfo)
  local imageExtension = self.params.burgerImage.filename:match('.+%.(.-)$')
  if not extTable[imageExtension] then
    return
  end

  local fileName = burgerInfo.burgerID..'.'..imageExtension
  local iconName = burgerInfo.burgerID..'-ico.'..imageExtension
  local savePath = 'static/uploads/'

  burgerInfo['img:filename'] = fileName
  burgerInfo['img:iconName'] = iconName
  local file, err = io.open(savePath..fileName, 'w+')
  file:write(self.params.burgerImage.content)
  file:close()

  magick.thumb(savePath..fileName, "150x150", savePath..iconName)

end

local function BurgerSubmit(self)




  local burgerInfo = {
    meatRating = self.params.meatRating or 0,
    bunRating = self.params.bunRating or 0,
    toppingRating = self.params.toppingRating or 0,
    restaurantName = self.params.restaurantName or 'RName',
    burgerName = self.params.burgerName or 'BName',
    lat = self.params.lat or 0,
    long = self.params.long or 0,
    burgerID = uuid.generate_random()
  }

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
  app:get("viewburger", "/burger/:burgerID", ViewBurger)
end

return M
