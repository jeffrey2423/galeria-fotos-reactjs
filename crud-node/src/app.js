const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);


app.listen(3000, () =>{
	console.log('Server on port 3000');
});