const router = require('express').Router();
const museumService = require('../services/museumService');

router.get('/', async (req, res)=> {
    const museums = await museumService.getAll();
    res.json(museums);
})

router.post('/', async (req, res, next)=> {
    const museumData = req.body;
    
    try {
        const museums = await museumService.create({...museumData, owner: req.user._id});   

        res.json(museums);
    } catch (error) {
        next(error)
    }
})

router.get('/:museumId', async (req,res)=> {
    const museum = await museumService.getOne(req.params.museumId);

    res.json(museum)
})

router.put('/:museumId', async (req,res)=> {
    const museumData = req.body;
    const museum = await museumService.edit(req.params.museumId, museumData);

    res.json(museum)
})

router.delete('/:museumId', async (req,res)=> {
    await placeService.delete(req.params.museumId);

    res.json({ok: true}); //?
})

module.exports = router