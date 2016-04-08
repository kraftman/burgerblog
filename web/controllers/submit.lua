

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


  local burgerInfo = {}
  burgerInfo.meatRating = self.params.meatRating or 0
  burgerInfo.

  print(to_json(self.params))


  return {redirect_to = self:url_for("index")}
end


function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
end

return M
