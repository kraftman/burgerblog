var express = require('express');
var router = express.Router();
const burgerDal = require('../dal/burgerdal');
const { checkSchema } = require('express-validator/check');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const uuid = require('uuid/v4');
const md5 = require('md5');

const validator = () => {
  return {
    count: {
      in: ['params'],
      isInt: true,
    },
  };
};

const getBurgerScore = (burger) => {
  return Math.floor(
    (burger.meatFlavour +
      burger.meatTexture +
      burger.meatSucculence +
      burger.meatVolume +
      burger.toppingRating) *
      2
  );
};

const getMealScore = (burger) => {
  return Math.floor(
    ((burger.meatFlavour +
      burger.meatTexture +
      burger.meatSucculence +
      burger.meatVolume +
      burger.toppingRating +
      burger.sideRating) /
      60) *
      100
  );
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

router.get('/burger/:id', async (req, res) => {
  const burgerID = req.params.id;
  const burger = await burgerDal.getBurgerInfo(burgerID);
  return res.json(burger);
});

const loginPost = upload.fields([{ name: 'username' }, { name: 'password' }]);

router.post('/login', loginPost, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.params);
  console.log(username, password);
  if (username !== 'kraftman') {
    res.status(401);
    return res.json({ err: 'bad username' });
  }

  const hashedPassword = md5(password + 'hashesallthewaydown');
  if (hashedPassword !== 'b718340fc49cfc9d542eab79e5eeaab8') {
    return res.json({ err: 'bad password' });
  }

  const token = uuid();
  return res.json({ token });
});

var cpUpload = upload.fields([
  { name: 'icon' },
  { name: 'image' },
  { name: 'restaurantName' },
  { name: 'dateEaten' },
  { name: 'burgerName' },
  { name: 'lat' },
  { name: 'long' },
  { name: 'burgerNotes' },
  { name: 'meatFlavour' },
  { name: 'meatTexture' },
  { name: 'meatSucculence' },
  { name: 'meatVolume' },
  { name: 'bunRating' },
  { name: 'toppingRating' },
  { name: 'sideRating' },
]);

router.post('/upload', cpUpload, async function(req, res) {
  const burger = {
    icon: req.files.icon[0].filename,
    image: req.files.image[0].filename,
    restaurantName: req.body.restaurantName || '',
    dateEaten: req.body.dateEaten || '',
    burgerName: req.body.burgerName || '',
    lat: parseFloat(req.body.lat) || 0,
    long: parseFloat(req.body.long) || 0,
    burgerNotes: req.body.burgerNotes || '',
    meatFlavour: parseInt(req.body.meatFlavour) || 0,
    meatTexture: parseInt(req.body.meatTexture) || 0,
    meatSucculence: parseInt(req.body.meatSucculence) || 0,
    meatVolume: parseInt(req.body.meatVolume) || 0,
    bunRating: parseInt(req.body.bunRating) || 0,
    toppingRating: parseInt(req.body.toppingRating) || 0,
    sideRating: parseInt(req.body.sideRating) || 0,
  };

  burger.mealScore = getBurgerScore(burger);
  burger.burgerScore = getMealScore(burger);
  burger.modApproved = 'false';
  burger.createdAt = new Date().getTime() / 1000;
  burger.dateEaten = burger.dateEaten || burger.createdAt;
  burger.burgerID = uuid();
  try {
    await burgerDal.createBurger(burger);
    res.json({ success: true });
  } catch (err) {
    console.log('errored: ', err);
    console.log(err.stack);
    res.status(500);
    return res.json({ success: false });
  }
});

module.exports = router;
