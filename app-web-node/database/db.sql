CREATE DATABASE app_node;

USE app_node;

CREATE TABLE users(
	id int(11) not null,
	username varchar(16) not null,
	password varchar(60) not null,
	fullname varchar(100) not null
);

ALTER TABLE users
	ADD PRIMARY KEY (id);

ALTER TABLE users 
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2;

DESCRIBE users;

--tabla de enlaces
CREATE TABLE links(
	id int(11) not null,
	title varchar(150) not null,
	url varchar(255) not null,
	description TEXT,
	user_id int(11),
	--para obtener la hora de creacion
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
	ADD PRIMARY KEY (id);

ALTER TABLE links
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;