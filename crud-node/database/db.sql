--creando la base de datos
CREATE DATABASE crudnode;

--utilizando la base de datos
USE crudnode;

--creando una tabla
CREATE TABLE customer(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	address VARCHAR(100) NOT NULL,
	phone VARCHAR(15)
);

--mostramos todas las tablas
SHOW TABLES;

--describimos la tabla
DESCRIBE customer;