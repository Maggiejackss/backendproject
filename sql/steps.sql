create database reviews;
\c reviews;
create table users(username, password, datecreated, standings),
userreviews(movietitle, stars, datereviewed, reviewjson), 
movieinfo(yearreleased, totalstars, userrevjson)