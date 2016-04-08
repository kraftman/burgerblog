

local redis = require 'resty.redis'

local red = redis:new()
local ok, err = red:connect("redis", 6379)
if not ok then
    ngx.say("failed to connect: ", err)
    return
end

local api = {}

function api:GetRedisConnection()

end


return api
