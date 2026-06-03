const express = require('express');
const path = require('path');
const router = express.Router();

// Product Page Route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
});



// Products' detail Page Route
router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products-detail.html'));
});

module.exports = router;