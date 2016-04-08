

local M = {}

local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json
local respond_to = (require 'lapis.application').respond_to
local redis = require 'resty.redis'

local function BurgerForm()

  return {render = 'burgerform'}
end

local function BurgerSubmit(self)
  local red = redis:new()
  local ok, err = red:connect("redis", 6379)
  if not ok then
      ngx.say("failed to connect: ", err)
      return
  end


  for k,v in pairs(self.params) do
    print(k)
    for i,j in pairs(v) do
      print(i, type(j), j)
    end
  end


  return {redirect_to = self:url_for("index")}
end


function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
end

return M
