const router = require('express').Router();

const { isGuest } = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');




router.post('/register',isGuest, async (req, res)=>{
    const userData = req.body;
    console.log(userData);

    try {
    const token = await authService.register(userData);

    res.cookie('auth', token);
    res.json(userData);
   
    } catch(err){
        res.json( {...userData, error: getErrorMessage(err)});
    }
});


router.post('/login', async (req, res)=>{
    const loginData = req.body;

   try {
    const token = await authService.login(loginData);

   res.cookie('auth', token);

   } catch (err){
    res.json( { ...loginData, error: getErrorMessage(err)});
   }
});

router.get('/logout', (req,res)=>{
    res.clearCookie('auth');
    res.redirect('/')
});

module.exports = router;