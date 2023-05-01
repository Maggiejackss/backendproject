require('dotenv').config();

const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const pgp = require('pg-promise')();

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

const validCreds = {
  username: 'dave',
  password: '1234'
}

server.get('/', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('landing')
  });
});

server.get('/about', (req, res) => {
  console.log('pota', req.url);
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('about')
  });
});

server.get('/login', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('login')
  });
});

server.post('/login', (req, res) => {
  const afterLogin = {
    isAuthenticated: false,
    redirectTo: './login'
  };
  const { username, password } = req.body;
  if (password === validCreds.password && username === validCreds.username) {
    req.session.userId = username;
    afterLogin.isAuthenticated = true;
    afterLogin.redirectTo = './profile';
  }
  res.json(afterLogin);
})


server.get('/gallery', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('gallery')
  });
});

server.get('/profile', checkAuth, (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('profile')
  });
});

server.get('/logout', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('logout')
  });
});


server.get('/contact-us', (req, res) => {
  res.render('index', {
    locals: setNavs(req.url, navs),
    partials: setMainView('contact-us')
  });
});

const PORT = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(PORT, () => console.log (`this server is running at PORT ${PORT}`));
