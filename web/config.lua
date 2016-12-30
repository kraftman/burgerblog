-- config.moon
local config = require("lapis.config")

config("development", {
  port = 80
})

config("production", {
  port = 80,
  secret = 'lalalalal1234456789'
})
