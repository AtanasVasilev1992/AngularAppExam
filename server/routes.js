const router = require('express').Router();
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
const museumController = require('./controllers/museumController')


router.use('/users', userController);
router.use('/museums', museumController);
router.use('/places', placeController);//!


module.exports =  router;