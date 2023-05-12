CREATE DATABASE reviews;
\c reviews;
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50),
    password TEXT,
    datecreated DATE,
    email VARCHAR(50)
);
CREATE TABLE userreviews (
    userid ibtjbdf,
    movieid,
    movietitle VARCHAR(100),
    stars INTEGER,
    datereviewed DATE,
    reviewjson JSON
    FOREIGN KEY (userid) REFERENCES users(id),
    
);

CREATE TABLE movieinfo (
    id INT
    movietitle VARCHAR(50),
    yearreleased INTEGER,
    totalstars INTEGER,
    userrevjson JSON
);

INSERT INTO userreviews (movietitle, stars, datereviewed, reviewjson)
VALUES ('The Godfather', 5, '2023-04-30', '{"review": "This is a great movie!", "author": "johndoe"}');


INSERT INTO movieinfo ( movietitle, yearreleased, totalstars, userrevjson)
VALUES ( 'The Godfather', 1972, 5, '{"reviews": [{"review": "This is a great movie!", "author": "johndoe"}]}');
