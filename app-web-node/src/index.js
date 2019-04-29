const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlerbars');
const path = require('path');

//inicializaciones de la aplicacion
const app = express();

//Configuracion servidor
app.set('port', process.env.PORT || 4000);
	//Capturamos la direccion de las vistas
app.set('views', path.join(__dirname, 'views'));
	//definimos un motor para las plantillas
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join()
}));

//Funciones para las peticiones cliente
app.use(morgan('dev'));

//variables globales

//rutas
app.use(require('./routes/'))

//publico

//Corriendo el servidor
app.listen(app.get('port'), ()=>{
	console.log('servidor en el puerto ', app.get('port'));
});
