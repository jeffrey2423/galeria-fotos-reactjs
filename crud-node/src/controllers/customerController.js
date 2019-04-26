const controller = {};

controller.list = (req, res) => {
	req.getConnection((err, conn)=>{
	conn.query('SELECT * FROM customer', (err, customers) => {
			if (err) {
				res.json(err);
			}

			res.render('customers',{
				data: customers
			});
		});
	});
};

//los parametros que se pasan a la funcion son tipicos del la libreria express
controller.save = (req, res) => {
	const datosFormulario = req.body;
	req.getConnection((err, conn)=>{
	conn.query('INSERT INTO customer set ?',[datosFormulario], (err, customer) => {
			if (err) {
				res.json(err);
			}
			console.log(customer);
			res.send('funciona');

		});
	});
};


module.exports = controller;