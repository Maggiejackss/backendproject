CREATE DATABASE reviews;
\c reviews;
CREATE TABLE users (
    username VARCHAR(50),
    password VARCHAR(50),
    datecreated DATE
);
CREATE TABLE userreviews (
    movietitle VARCHAR(100),
    stars INTEGER,
    datereviewed DATE,
    reviewjson JSON
);
CREATE TABLE movieinfo (
    movietitle VARCHAR(50),
    yearreleased INTEGER,
    totalstars INTEGER,
    userrevjson JSON
);
INSERT INTO users (username, password, datecreated)
VALUES ('johndoe', 'mypassword', '2023-04-30');


INSERT INTO userreviews (movietitle, stars, datereviewed, reviewjson)
VALUES ('The Godfather', 5, '2023-04-30', '{"review": "This is a great movie!", "author": "johndoe"}');


INSERT INTO movieinfo ( movietitle, yearreleased, totalstars, userrevjson)
VALUES ( 'The Godfather', 1972, 5, '{"reviews": [{"review": "This is a great movie!", "author": "johndoe"}]}');
