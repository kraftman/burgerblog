

local redis = require 'resty.redis'
local uuid = require 'uuid'

redis.add_commands("geoadd")

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


function api:ConvertListToTable(list)
  local info = {}
  for i = 1,#list, 2 do
    info[list[i]] = list[i+1]
  end
  return info
end

function api:GetTopBurgers(count)
  local red = self:GetRedisConnection()
  local res, err = red:zrevrange('burgerScores',0, count-1)
  local ok

  local burgers = {}

  if res then
    for k, v in pairs(res) do
      ok, err = red:hgetall('burger:'..v)
      if ok then
        burgers[k] = self:ConvertListToTable(ok)
      end
    end
  end

  return burgers

end

function api:GetRecentBurgers(count)
  local red = self:GetRedisConnection()
  local res, err = red:zrevrange('burgerDates',0, count-1)
  local ok

  local burgers = {}

  if res then
    for k, v in pairs(res) do
      ok, err = red:hgetall('burger:'..v)
      if ok then
        burgers[k] = self:ConvertListToTable(ok)
      end
    end
  end

  return burgers

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
  local red = self:GetRedisConnection()
  burgerInfo.burgerID = uuid.generate_random()
  burgerInfo.createdAt = ngx.time()
  burgerInfo.totalScore = burgerInfo.meatRating + burgerInfo.bunRating + burgerInfo.toppingRating
  local ok, err = red:hmset('burger:'..burgerInfo.burgerID, burgerInfo)
  if not ok then
    ngx.log(ngx.ERR, 'unable to write to redis: ', err)
  end

  ok, err = red:zadd('burgerScores',burgerInfo.totalScore, burgerInfo.burgerID)
  if not ok then
    ngx.log(ngx.ERR, 'unable to add to set: ',err)
  end

  ok, err = red:zadd('burgerDates', burgerInfo.createdAt, burgerInfo.burgerID)
  if not ok then
    ngx.log(ngx.ERR, 'unable to zadd: ', err)
  end

  ok, err = red:geoadd(burgerInfo.burgerID, burgerInfo.lat, burgerInfo.long)
  if not ok then
    ngx.log(ngx.ERR, 'eek: ', err)
  end

end


return api
