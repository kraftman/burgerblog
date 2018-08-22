const redis = require('async-redis');
const client = redis.createClient({
  port: 6379,
  host: 'redis',
});

client.on('error', function(err) {
  console.log('Error: ' + err);
});

const getBurgerInfo = async (burgerID) => {
  return client.hgetall(`burger:${burgerID}`);
};

const getBurgerInfos = async (burgerIDs) => {
  const promises = burgerIDs.map(getBurgerInfo);
  return Promise.all(promises);
};

const getTopBurgers = async (count = 10, offset = 0) => {
  const topBurgers = await client.zrevrange(
    'burgerScores',
    offset,
    offset + count
  );
  return getBurgerInfos(topBurgers);
};

const getWorstBurgers = async (count = 10, offset = 0) => {
  const worstBurgers = await client.zrange(
    'burgerScores',
    offset,
    offset + count
  );
  return getBurgerInfos(worstBurgers);
};

const createBurger = async (burger) => {
  console.log(burger);
  await client.hmset('burger:' + burger.burgerID, burger);
  await client.zadd('burgerScores', burger.burgerScore, burger.burgerID);
  await client.zadd('mealScores', burger.mealScore, burger.burgerID);
  await client.zadd('burgerDates', burger.dateEaten, burger.burgerID);
  await client.geoadd(
    'burgerLocations',
    burger.long,
    burger.lat,
    burger.burgerID
  );

  // hmset
  // zadd burgerScores
  // zadd mealscores
  // zadd burgerdates
  // geoadd burger locations
};

module.exports = {
  getTopBurgers,
  getWorstBurgers,
  createBurger,
  getBurgerInfo,
};
