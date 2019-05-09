const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) =>{
	res.render('links/add');
});

router.post('/add', async (req, res) =>{
	const {title, url, description} = req.body;
	const newLink = {
		title,
		url,
		description
	};
	console.log(newLink);
	await pool.query('INSERT INTO links set ?', [newLink]);
	req.flash('success', {'success': 'Link guardado correctamente'});
	res.redirect('/links');
	//res.render('./layouts/main', { success: req.flash('success') });
	//res.status({success: req.flash('success')}).redirect('../layouts/main.hbs');
});

//mensajes
/*router.post('/', function(req, res){
  res.render('/links', { success: req.flash('success') });
});*/

router.get('/', async (req, res) =>{
	const links = await pool.query('SELECT * FROM links');
	console.log(links);
	res.render('links/list', {links});
});

router.get('/delete/:id', async (req, res) =>{
	const idEliminar = req.params.id;
	const links = await pool.query('DELETE FROM links WHERE id = ?',[idEliminar]);
	res.redirect('/links');
});

router.get('/edit/:id', async (req, res) =>{
	const idEditar = req.params.id;
	const links = await pool.query('SELECT * FROM links WHERE id = ?',[idEditar]);
	res.render('links/edit', {links});
});

router.post('/modify/:id', async (req, res) =>{
	const idEditar = req.params.id;
	const {title, url, description} = req.body;
	const newLink = {
		title,
		url,
		description
	};
	console.log(newLink);
	await pool.query('UPDATE links set ? WHERE id = ?', [newLink, idEditar]);
	res.redirect('/links');
});
module.exports = router;