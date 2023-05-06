require('dotenv').config();

const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const pgp = require('pg-promise')();
const cors = require('cors');
let date = new Date().toISOString();


const cn = {
  host: 'localhost',
  port: 5432,
  database: 'reviews',
  user: 'postgres',
  password: 'grady',
  allowedExitOnIdle: true,
}

const db = pgp(cn);

const { checkAuth } = require('./middleware');
const { setMainView, setNavs } = require('./utils');
const express = require('express');
const navs = require('./directory/navs.json');


const server = express();

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(cookieParser());
server.use(sessions({
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie: { maxAge: 30000 },
  resave: false
}));
server.use(cors({
  origin: ['http://127.0.0.1:5500']
}));


server.get('/', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('landing')
  });
});

server.get('/about', (req, res) => {
  console.log('pota', req.url);
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('about')
  });
});

server.get('/login', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('login')
  });
});

server.post('/login', async (req, res) => {
  const afterLogin = {
    isAuthenticated: false,
    redirectTo: './login'
  };
  const { username, password } = req.body;
  console.log(username);
  let result = await db.query(`SELECT password FROM users WHERE username = '${username}'`);
  if (password === result[0].password) {
    req.session.userId = username;
    afterLogin.isAuthenticated = true;
    afterLogin.redirectTo = './profile';
  }
  res.json(afterLogin);
})


server.get('/gallery', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('gallery')
  });
});

server.get('/profile', checkAuth, (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('profile')
  });
});

server.get('/signup', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('signup')
  });
});

/* This code block is handling a POST request to the '/signup' endpoint. It is checking if the username
already exists in the database, and if not, it is inserting the new user's information into the
database and setting the session's userId to the new user's username. It then sends a JSON response
indicating whether the registration was successful or not, and where to redirect the user. */
server.post('/signup', async (req, res) => {
  console.log('hello');
  const afterSignup = {
    isAuthenticated: false,
    redirectTo: './signup'
  }
  const {username, password, email} = req.body;
  console.log({username, password, email});
  let result = await db.manyOrNone(`SELECT username FROM users WHERE username = '${username}'`);
  console.log(result.length);
  if (result && result.length > 0) {
    console.log('error: user already exists');
    res.json('error: user already exists');
  } else {
    await db.query(`INSERT INTO users (username, password, datecreated, email) VALUES ('${username}', '${password}', '${date}', '${email}')`);
    console.log('running else');
    req.session.userId = username;
    afterSignup.isAuthenticated = true;
    afterSignup.redirectTo = './profile';
  }
  res.json(afterSignup);
}) 

server.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


server.get('/contact-us', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView('contact-us')
  });
});

const PORT = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(PORT, () => console.log (`this server is running at PORT ${PORT}`));
