local lapis = require("lapis")
local app = lapis.Application()
local api = require 'burgerapi'
app:enable("etlua")
app.layout = require "views.layout"

app:get("index", "/", function(self)
  --return "Welcome to Lapis " .. require("lapis.version")
  --load all burgerapi

  self.top10 = api:GetTopBurgers(10)
  self.recent10 = api:GetRecentBurgers(10)

  return {render = 'index'}
end)

app:get("viewburger", "/burger/:burgerID", function(self)
  -- load burger info from api
  -- add to self
  return {render = 'burger'}
end)


require 'submit':Register(app)


return app
