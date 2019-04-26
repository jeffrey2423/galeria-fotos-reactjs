//librearia para manejar el servidor
const express = require('express');
//modulo para unir directorios
const path = require('path');
//modulo para las peticiones
const morgan = require('morgan');
//modulo para mysql
const mysql = require('mysql');
const myConnection = require('express-myconnection');


const app = express();

//importando rutas
const customerRoutes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
//son funciones antes que se ejecutan de las peticiones del cliente
app.use(morgan('dev'));

app.use(myConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: 'pass',
	port: 3306,
	database: 'crudnode',
	//insecureAuth : true
}, 'single'));

app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), () =>{
	console.log('Server on port 3000');
});