const router = require('express').Router();
const placeService = require('../services/placeService')

router.get('/', async (req, res)=> {
    const places = await placeService.getAll();
    res.json(places);
})

router.post('/', async (req, res, next)=> {
    const placeData = req.body;
    
    try {
        const places = await placeService.create({...placeData, owner: req.user._id});   

        res.json(places);
    } catch (error) {
        next(error)
    }
})

router.get('/:placeId', async (req,res)=> {
    const place = await placeService.getOne(req.params.placeId);

    res.json(place)
})

router.put('/:placeId', async (req,res)=> {
    const placeData = req.body;
    const place = await placeService.edit(req.params.placeId, placeData);

    res.json(place)
})

router.delete('/:placeId', async (req,res)=> {
    await placeService.delete(req.params.placeId);

    res.json({ok: true}); //?
})

module.exports = router