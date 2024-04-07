const router = require('express').Router();
const placeService = require('../services/PlaceService')

router.get('/', async (req, res)=>{
    // res.render('home');
});

router.get('/search', async (req, res)=>{
    const {name, type} = req.query
    const places = await placeService.search(name, type).lean();
    res.json(...places);
});

module.exports = router;