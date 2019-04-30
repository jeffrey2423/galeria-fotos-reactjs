const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, conn) =>{
	/*    if (err) {
          conn.release();
          throw err;
        }   
        conn.query(query,function(err,rows){
            conn.release();
            if(!err) {
                callback(null, {rows: rows});
            }           
        });
        conn.on('error', function(err) {      
              throw err;
              return;     
        });*/
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('DATABASE CONECTION WAS CLOSED');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('DATABASE HAS TOO MANY CONNECTIONS');
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('DATABASE CONNECTION WAS REFUSED');
		}
	}

	if (conn) conn.release();
		console.log('LA BASE DE DATOS SE HA CONECTADO');
	return;/*
	        conn.on('error', function(err) {      
              throw err;
              return;     
        });*/
});


//consultas
pool.query = promisify(pool.query);

module.exports = pool;