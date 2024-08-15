-- Active: 1723549151109@@127.0.0.1@3306@node_mysql_course
CREATE DATABASE node_mysql_course;

USE node_mysql_course;

CREATE TABLE IF NOT EXISTS persons (
    person_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    age INTEGER
);

SELECT * FROM persons;