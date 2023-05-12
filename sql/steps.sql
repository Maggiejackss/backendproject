CREATE DATABASE reviews;
\c reviews;
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50),
    password TEXT,
    datecreated DATE,
    email VARCHAR(50)
);
CREATE TABLE movieinfo (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    movietitle VARCHAR(50),
    yearreleased INTEGER,
    totalstars INTEGER,
    userrevjson JSON
);
CREATE TABLE userreviews (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userid INT,
    movietitle VARCHAR(100),
    stars INTEGER,
    datereviewed DATE,
    reviewjson JSON,
    FOREIGN KEY (userid) REFERENCES users(id), 
    FOREIGN KEY (id) REFERENCES movieinfo(id)
);




