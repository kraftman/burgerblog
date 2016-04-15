

local M = {}

local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json
local respond_to = (require 'lapis.application').respond_to
local api = require 'burgerapi'

local function BurgerForm()


  return {render = 'burgerform'}
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
  }
  print(to_json(self.params ))

  if self.params.images then
    for k,v in pairs(self.params.images) do
      burgerInfo['img:'..k] = v.content
      
      burgerInfo.imgCount = k
    end
  end

  api:CreateBurgerPost(burgerInfo)


  return {redirect_to = self:url_for("index")}
end


function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
end

return M
