const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const placeController = require('./controllers/placeController');
const museumController = require('./controllers/museumController');

router.use(homeController);
router.use('/auth', authController);
router.use('/places', placeController);
router.use('/museums', museumController);


router.all('*', (req, res)=>{
    // res.render('404');
});

module.exports = router;