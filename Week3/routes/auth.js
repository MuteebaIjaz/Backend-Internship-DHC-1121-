const express = require('express');
const router = express.Router();

// Authentication & Authorization Middleware
const {
    redirectIfAuthenticated,
    Auth,
    AdminOnly,
    optionalAuth
} = require('../middleware/auth.js');

// User Controllers
const {
    RegisterUser,
    LoginUser,
    AddProducts
} = require('../controllers/User.controller.js');

// Product Controllers
const {
    getHome,
    getProducts,
    getProductDetails
} = require('../controllers/Product.controller.js');




// Login Page
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('Login');
});

// Register Page
router.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('Register');
});




// Home Page 
router.get('/', optionalAuth, getHome);



// Products Listing Page
router.get('/products', optionalAuth, getProducts);

// Single Product Details Page
router.get('/products/:id', optionalAuth, getProductDetails);


// Admin Routes
router.get(
    '/add-products',
    Auth,
    AdminOnly,
    (req, res) => {
        res.render('Add-Products', {
            user: req.user
        });
    }
);

// Handle Add Product Form Submission
router.post('/add-products', Auth, AdminOnly, AddProducts);




// Register User
router.post('/register', RegisterUser);

// Login User
router.post('/login', LoginUser);

// Logout User
router.post('/logout', Auth, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });

    res.redirect('/login');
});



module.exports = router;