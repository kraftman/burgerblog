var express = require('express');
var router = express.Router();
const burgerDal = require('../dal/burgerdal');
const { checkSchema } = require('express-validator/check');

const validator = () => {
  return {
    count: {
      in: ['params'],
      isInt: true,
    },
  };
};

router.get('/top/:count', checkSchema(validator), async function(req, res) {
  const count = req.params.count || 10;
  const topBurgers = await burgerDal.getTopBurgers(count);
  return res.json(topBurgers);
});
router.get('/bottom/:count', checkSchema(validator), async function(req, res) {
  const count = req.params.count || 10;
  const topBurgers = await burgerDal.getWorstBurgers(count);
  return res.json(topBurgers);
});

module.exports = router;
