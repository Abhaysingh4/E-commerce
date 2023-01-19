const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    
    res.render('auth/signup');
});
router.post('/register', async (req, res) => {
    try {
        const { username, password, email,role } = req.body;
        const user = new User({ username, email,role });
        const newUser = await User.register(user, password);

        req.login(newUser, function(err) {
            if (err){
                return next(err);
            }

            req.flash('success', 'Welcome , You are Registered Successfully');
            return res.redirect('/products');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});
router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        console.log(req.user);
        req.flash('success', 'Welcome , You are Logged in Successfully');
            return res.redirect('/products');
});
router.get('/logout', function (req, res, next) {
    
    req.logout(function (err){
    if (err) { return (next(err)); }

    req.flash('success', 'GoodBye!!');
    res.redirect('/products');
});
});


module.exports=router;