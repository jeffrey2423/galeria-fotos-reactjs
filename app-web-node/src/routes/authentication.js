const express = require('express');
const router = express.Router();

const passport = require('passport');

//RENDIRIZAMOS LAS VISTAS
// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

/*
router.post('/signup', (req, res, next) =>{
	passport.authenticate('local.signup', {
		successRedirect:
		res.render('auth/signin'),
		failureRedirect:
			req.session.save(function () {
  				res.redirect('/signup');
			}),
		failureFlash: true
	})(req, res, next);
});*/

/*router.post('/signup', (req, res, next) =>{
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});
*/
// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: req.session.save(function () { res.redirect('/signin') }),
    failureRedirect: req.session.save(function () { res.redirect('/signin') }),
    failureFlash: true
  })(req, res, next);
});

/*router.post('/signin', (req, res, next) =>{
	passport.authenticate('local.signin', {
		successRedirect:
			req.session.save(function () {
  				res.redirect('/signin');
			}),
		failureRedirect:
			req.session.save(function () {
  				res.redirect('/signin');
			}),
		failureFlash: true
	})(req, res, next);
});*/


router.get('/profile', (req, res) =>{
	res.send('estas en tu perfil');
});




module.exports = router;