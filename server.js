require('dotenv').config();
const es6Renderer = require('express-es6-template-engine');
const express = require('express');

const server = express();

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => {
  res.render('index', {
    partials: {
      footer: 'partials/footer',
      header: 'partials/header',
      main: 'partials/mainHTMLs/landing'
    }
  });
});

server.get('/login', (req, res) => {
  res.render('index', {
    partials: {
      footer: 'partials/footer',
      header: 'partials/header',
      main: 'partials/mainHTMLs/login'
    }
  });
});

const PORT = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(PORT, () => console.log (`this server is running at PORT ${PORT}`));
