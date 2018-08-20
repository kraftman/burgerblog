var express = require('express');
var router = express.Router();
const burgerDal = require('../dal/burgerdal');
const { checkSchema } = require('express-validator/check');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

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

var cpUpload = upload.fields([
  { name: 'icon', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'restaurantName', maxCount: 1 },
]);

router.post('/upload', cpUpload, async function(req, res) {
  console.log(req.files['icon']);
  console.log(req.files['image']);
  console.log(req.body['restaurantName']);
  res.json({ success: true });
});

module.exports = router;
