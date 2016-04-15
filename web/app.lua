local lapis = require("lapis")
local app = lapis.Application()
local api = require 'burgerapi'
app:enable("etlua")
app.layout = require "views.layout"


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
  return 'top 10 of all time!'
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
  print(to_json(nearestBurgers))

  return {json = nearestBurgers}

end)

app:get("viewburger", "/burger/:burgerID", function(self)
  -- load burger info from api
  -- add to self
  self.burger = api:GetBurger(self.params.burgerID)
  if not self.burger then
    return { render = "error404", status = 404}
  end
  return {render = 'burger'}
end)


require 'submit':Register(app)


return app
