

local redis = require 'resty.redis'


local api = {}

function api:GetRedisConnection()

  local red = redis:new()
	local ok, err = red:connect("redis", 6379)
	if not ok then
	    ngx.say("failed to connect: ", err)
	    return
	end
  return red
end

function api:CreateBurgerPost(burgerInfo)
  --[[
      hash:
      burgerID ->
        burgerID
        burgerName
        restaurantName
        meatRating
        bunRating
        toppingRating
        chipRating
        notes

      sets:
      burgername -> burgerID
      burgerID ->burgerName

      sorted set
      totalScore -> burgerID
      date - > burgerID

      geo:
      add  burgerID: lat: long

      What we want to show users:
      top 10 burgers
      nearest burgers
      newest burgers

    ]]
end


return api
