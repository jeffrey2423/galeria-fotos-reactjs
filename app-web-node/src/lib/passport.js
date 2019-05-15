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
	await pool.query('SELECT * FROM users Where username = ?', [username], async (res, err, rows) =>{
		
		if (err)
			return done(err);
		if (rows.length) {
			//req.flash('success', 'ya existe el user');
			console.log('ya existe');
			req.flash('success', 'error')
			req.session.save(function () {
		  		res.redirect('/signup');
			});
		}else{
			const result = await pool.query('INSERT INTO users SET ?', [newUser]);
			newUser.id = result.insertId;
			return done(null, newUser);

		}
	});
	//const resultUser = mysql_fetch_row(verUser);
	//if(resultUser === 0){

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

