const express = require('express');
const User = require('../models/User.model.js');
const bcrypt = require('bcryptjs');
const GenerateToken = require('../jwt/jwt.js');
const Product = require('../models/products.model.js');






// User-Registration Controller
const RegisterUser = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body
        if (!name || !email || !password || !confirm_password) {
            return res.status(400).render('register', { message: 'Kindly fill all the fields' });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const exists = await User.findOne({ email });
        if (exists) {
            return res.render('register', { message: 'Email is already in use' });

        }
        if (password !== confirm_password) {
            return res.render('register', { message: 'Password and Confirm Password do not match' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email: normalizedEmail, password: hashedPassword });
        res.redirect('/Login');
    } catch (error) {
        console.log(error);
        return res.status(500).render('404', {
            message: 'Internal Server Error'
        });

    }
};

// User-Login Controller
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render('Login', { message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('Login', { message: 'Invalid credentials' });
        }
        const token = GenerateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).render('404', {
            message: 'Internal Server Error'
        });
    }
}
// Admin-Add-Products Controller
const AddProducts = async (req, res) => {
    try {
        const { name, price, category, image, description, stock } = req.body;
        const productExists = await Product.findOne({ name });
        if (price <= 0) {
            return res.render('Add-Products', {
                message: 'Price must be greater than 0',
                user: req.user
            });
        }

        if (stock < 0) {
            return res.render('Add-Products', {
                message: 'Stock cannot be negative',
                user: req.user
            });
        }




        if (productExists) {
            return res.render('Add-Products', { message: 'Product already exists', user: req.user });
        }


        await Product.create({ name, price, category, image, description, stock });
        res.redirect('/');


    } catch (error) {
        console.log(error);
        return res.status(500).render('404', {
            message: 'Internal Server Error'
        });
    }
}

module.exports = { RegisterUser, LoginUser, AddProducts };