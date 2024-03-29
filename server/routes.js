const router = require('express').Router();
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');


router.use('/users', userController);
router.use('/places', placeController);//!

module.exports =  router;