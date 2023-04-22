require('dotenv').config();

const express = require('express');

const server = express();

const PORT = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({message: 'heartbeat'});
})

server.listen(PORT, () => console.log (`this server is running at PORT ${PORT}`));
