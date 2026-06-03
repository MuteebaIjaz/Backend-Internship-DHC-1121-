const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_key_12345';





const Auth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();



    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};


const AdminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).redirect('/login');
    }
    if (req.user.role !== "admin") {
        return res.status(403).send("Access Denied, You can't access this Page!");
    }
    next();
}


const redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect('/');
        } catch (err) {
            res.clearCookie('token');
        }
    }

    next();
};



const optionalAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            res.clearCookie('token');
        }
    }
    next();
};


module.exports = {
    Auth,
    AdminOnly,
    redirectIfAuthenticated,
    optionalAuth
};