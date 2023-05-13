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
CREATE TABLE movieinfo (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    movietitle VARCHAR(50),
    yearreleased INTEGER,
    totalstars INTEGER,
    userrevjson JSON
);
CREATE TABLE userreviews (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
<<<<<<< HEAD
=======
    userid INT,
>>>>>>> 7194743bbe53baa848f64382543d8c4590e69a95
    movietitle VARCHAR(100),
    movieid INTEGER,
    stars INTEGER,
    datereviewed DATE,
    reviewjson JSON,
<<<<<<< HEAD
    FOREIGN KEY (id) REFERENCES users(id), 
    FOREIGN KEY (movieid) REFERENCES movieinfo(id)
=======
    FOREIGN KEY (userid) REFERENCES users(id), 
    FOREIGN KEY (id) REFERENCES movieinfo(id)
>>>>>>> 7194743bbe53baa848f64382543d8c4590e69a95
);




