const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//PASSPORT SIGNIN
passport.use('local.signin', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true

}, async (req, username, password, done)=>{
	
	const rows = await pool.query('SELECT * FROM users Where username = ?', [username]);
		if (rows.length > 0) {
			const user = rows[0];
			const validPassword = await helpers.matchPassword(password, user.password);
			if(validPassword){
				return done(null, user, req.flash('message', 'Bienvenido' + user.username));
			}else{
				return done(null, false, req.flash('error','Contraseña incorrecta'));
			}
		}else{
			return done(null, false, req.flash('error','El usuario no existe'));
		}
}));


//PASSPORT SIGNUP
passport.use('local.signup', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true

	//hacemos el callback
}, async(req, username, password, done)=>{
	const {fullname} = req.body;

	const newUser = {
		username,
		password,
		fullname
	};
	//encriptamos la contraseña
	newUser.password = await helpers.encryptPassword(password);
	//validamos que el usuario no sea el mismo
	const rowsUser = await pool.query('SELECT * FROM users Where username = ?', [username]);
		if (rowsUser.length > 0) {
			console.log('ya existe');
			//passport.authenticate('local.signup', {failureFlash: req.flash('error','El usuario ya existe, intenta con otro')});
			//done(null, false, {failureFlash: req.flash('error','El usuario ya existe, intenta con otro')});
			return done(null, false, req.flash('error','El usuario ya existe, intenta con otro'));
		}else{
			const result = await pool.query('INSERT INTO users SET ?', [newUser]);
			newUser.id = result.insertId;
			return done(null, true, req.flash('successSignUp','El usuario se ha creado con exito'));

		}
	


}));

passport.serializeUser((user, done) =>{
	done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
	const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
	done(null, rows[0]);
});

