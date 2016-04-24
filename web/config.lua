-- config.moon
local config = require("lapis.config")



config("production", {
  port = 80,
  secret = 'lalalalal1234456789'
})

config("production", {
  port = 8080,
  secret = 'super secret password'
})
