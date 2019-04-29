const express = require('express');
const morgan = require('morgan');


//inicializaciones de la aplicacion
const app = express();

//Configuracion servidor
app.set('port', process.env.PORT || 4000);

//Funciones para las peticiones cliente
app.use(morgan('dev'));

//variables globales

//rutas

//publico

//Corriendo el servidor
app.listen(app.get('port'), ()=>{
	console.log('servidor en el puerto ', app.get('port'));
});
