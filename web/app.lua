local lapis = require("lapis")
local app = lapis.Application()
app:enable("etlua")
app.layout = require "views.layout"

app:get("index", "/", function()
  --return "Welcome to Lapis " .. require("lapis.version")
  return {render = 'index'}
end)


require 'submit':Register(app)


return app
