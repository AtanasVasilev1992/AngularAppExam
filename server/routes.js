const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const placeController = require('./controllers/placeController')

router.use(homeController);
router.use('/auth', authController);
router.use('/places', placeController)

router.all('*', (req, res)=>{
    // res.render('404');
});

module.exports = router;