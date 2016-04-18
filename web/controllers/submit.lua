

local M = {}

local util = require("lapis.util")
local from_json = util.from_json
local to_json = util.to_json
local respond_to = (require 'lapis.application').respond_to
local api = require 'burgerapi'

local function BurgerForm()


  return {render = 'burgerform'}
end

local function BurgerSubmit(self)
  local extTable = {}
  extTable['jpg'] = 'image/jpeg'
  extTable['jpeg'] = 'image/jpeg'
  extTable['png'] = 'image/png'
  extTable['bmp'] = 'image/bmp'
  extTable['svg'] = 'image/svg'
  extTable['gif'] = 'image/gif'


  ngx.req.read_body()
  local args = ngx.req.get_post_args()

  print(to_json(args))
  print(to_json(self.req.params_post))

  for k,v in pairs(self.req.params_post['images[]']) do
    print(k,v)
    --print(k,to_json(v))
  end

  local burgerInfo = {
    meatRating = self.params.meatRating or 0,
    bunRating = self.params.bunRating or 0,
    toppingRating = self.params.toppingRating or 0,
    restaurantName = self.params.restaurantName or 'RName',
    burgerName = self.params.burgerName or 'BName',
    lat = self.params.lat or 0,
    long = self.params.long or 0,
  }
  --print(to_json(self.params ))

  if self.params.images then
    for k,v in pairs(self.params.images['']) do
      --print(k)
      --[[
      for i,j in pairs(v) do
        --print(i)
      end
      local fileExtension = v.filename:match(('.+%.(.-)$'))
      if not extTable[fileExtension] then
        return 'unsuppoted image type: '..fileExtension
      end

      burgerInfo['img:'..k..':data'] = v.content
      burgerInfo['img:'..k..':contentType'] = extTable[fileExtension]
      burgerInfo.imgCount = k
      ]]
    end
  end

  api:CreateBurgerPost(burgerInfo)


  return {redirect_to = self:url_for("index")}
end


function M:Register(app)
  app:match('submit','/submit',respond_to({GET = BurgerForm,POST = BurgerSubmit}))
end

return M
