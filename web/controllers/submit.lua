

local M = {}

local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json
local respond_to = (require 'lapis.application').respond_to

local function BurgerForm()

  return {render = 'burgerform'}
end

local function BurgerSubmit()

  return {render = 'index'}
end


function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
end

return M
