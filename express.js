const express = require('express');
const path = require('path');
var server = express();

server.use(express.static(path.join(__dirname))); 

server.get('/', function (req, res) {
    res.sendfile('index.html');
}); 

server.listen(8080);
