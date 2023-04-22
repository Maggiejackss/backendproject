const express = require('express');

const server = express();

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(8080, () => {
    console.log('the server is running at PORT 8080');
})

