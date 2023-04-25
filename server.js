require('dotenv').config();
const es6Renderer = require('express-es6-template-engine');
const { setMainView } = require('./utils');
const express = require('express');
const navs = require('./directory/navs.json');

const server = express();

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => {
  res.render('index', {
    locals: { navs },
    partials: setMainView('landing')
  });
});

server.get('/login', (req, res) => {
  res.render('index', {
    locals: { navs },
    partials: setMainView('login')
  });
});

const PORT = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(PORT, () => console.log (`this server is running at PORT ${PORT}`));
