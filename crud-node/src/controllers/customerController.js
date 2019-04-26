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
			res.redirect('/');

		});
	});
};

controller.edit = (req, res) => {
	const idActualizar = req.params.id;
	req.getConnection((err, conn)=>{
			conn.query('SELECT * FROM customer WHERE id = ?',[idActualizar], (err, customer) => {
				res.render('customer_edit',{
					data:customer[0]
				});

		});
	});
};

controller.update = (req, res) => {
	const idActualizar = req.params.id;
	const datosActualizados = req.body;
	req.getConnection((err, conn)=>{
			conn.query('UPDATE customer set ? WHERE id = ?',[datosActualizados, idActualizar], (err, customer) => {
			if (err) {
				res.json(err);
			}
			res.redirect('/');

			});
	});
};

controller.delete = (req, res) => {
	const idBorrar = req.params.id;
	//var result = confirm("Want to delete?");
	req.getConnection((err, conn)=>{
		//if (result) {
			conn.query('DELETE FROM customer WHERE id = ?',[idBorrar], (err, customer) => {
			if (err) {
				res.json(err);
			}
			res.redirect('/');
			//alert('gghghghgh')

			});
		/*}else{
			res.redirect('/');
		}*/

		

	});



};


module.exports = controller;