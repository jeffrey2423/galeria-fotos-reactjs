const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

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
	//const verUser = await pool.query('SELECT count(*) FROM users Where username = ?', [username]);
	//const resultUser = mysql_fetch_row(verUser);
	//if(resultUser === 0){
			const result = await pool.query('INSERT INTO users SET ?', [newUser]);
			newUser.id = result.insertId;
			return done(null, newUser);
	//}else{
		//req.flash('success', 'Link guardado correctamente');
	//}

}));

passport.serializeUser((user, done) =>{
	done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
	const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
	done(null, rows[0]);
});

