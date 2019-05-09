const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');

const {database} = require('./keys');

//inicializaciones de la aplicacion
const app = express();

//Configuracion servidor
app.set('port', process.env.PORT || 4000);
	//Capturamos la direccion de las vistas
app.set('views', path.join(__dirname, 'views'));
	//definimos un motor para las plantillas
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Funciones para las peticiones cliente
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
	secret: 'sessionapp',
	resave: false,
	saveUninitialized: false,
	store: new mysqlStore(database)

}));

app.use(flash());
//variables globales
app.use((req, res, next) =>{
	res.locals.success = req.flash();
	next();
});






//rutas
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//publico
app.use(express.static(path.join(__dirname, 'public')));

//Corriendo el servidor
app.listen(app.get('port'), ()=>{
	console.log('servidor en el puerto ', app.get('port'));
});
