const express = require('express');
const router = express.Router();

//definimos ruta inicial para el router
router.get('/', (req, res) => {
	res.send('hola mundo');
});


//exportando la vista
module.exports = router;