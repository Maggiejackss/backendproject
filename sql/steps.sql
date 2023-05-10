CREATE DATABASE reviews;
\c reviews;
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50),
    password TEXT,
    datecreated DATE,
    email VARCHAR(50)
   
);
CREATE TABLE userreviews (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userid INT REFERENCES users (id),
    movietitle VARCHAR(100),
    stars INTEGER,
    datereviewed DATE,
    reviewjson JSON,
    FOREIGN KEY (userid) REFERENCES users(id) 
    FOREIGN KEY (movieid) REFERENCES movieinfo(id)
);

CREATE TABLE movieinfo (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    movieid INTEGER,
    movietitle VARCHAR(50),
    yearreleased INTEGER,
    totalstars INTEGER,
    userrevjson JSON,
);


INSERT INTO userreviews (movietitle, stars, datereviewed, reviewjson)
VALUES ('The Godfather', 5, '2023-04-30', '{"review": "This is a great movie!", "author": "johndoe"}');


INSERT INTO movieinfo ( movietitle, yearreleased, totalstars, userrevjson)
VALUES ( 'The Godfather', 1972, 5, '{"reviews": [{"review": "This is a great movie!", "author": "johndoe"}]}');
