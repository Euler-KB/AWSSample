'use strict';

var http = require('http');
var dummyService = require('./services').getService('dummy');

var port = process.env.PORT || 1337;

dummyService.print();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from Node JS\n');
}).listen(port);
