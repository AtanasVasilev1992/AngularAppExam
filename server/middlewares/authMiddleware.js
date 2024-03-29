const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    
    const token = req.headers['x-authorization'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = await jwt.verify(token, "TheSecret123");

        req.user = decodedToken;
        res.locals.isAuthenticated = true;
      

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login')
    };
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login')
    };

    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/')
    };

    next();
};