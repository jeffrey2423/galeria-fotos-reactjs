const express = require('express');
const router = express.Router();

const passport = require('passport');

//RENDIRIZAMOS LAS VISTAS
router.get('/signup', (req, res) =>{
	res.render('auth/signup');
});
router.get('/signin', (req, res) =>{
	res.render('auth/signin');
});



router.post('/signup', passport.authenticate('local.signup', {
		successRedirect: '/signup',
		failureRedirect: '/signup',
		failureFlash: true
}));

/*router.post('/signup', (req, res, next) =>{
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});
*/
router.post('/signin', (req, res, next) =>{
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});


router.get('/profile', (req, res) =>{
	res.send('estas en tu perfil');
});




module.exports = router;