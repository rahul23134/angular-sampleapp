var express = require('express');

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
var fs = require('fs');
server.listen(8000);
app.use(express.static(__dirname));
app.use(app.router);
var customer=[{ id:'1',name: 'c1' },{ id:'2', name: 'c2' }];
app.get('/', function (req, res) { 
  res.set('content-type', 'text/html');
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});
app.get('/another/route', function (req, res) { 
  res.set('content-type', 'text/html');
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  io.sockets.emit('sendCustomer', customer);
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('getCustomer', function (data) {
    console.log(data);
	socket.emit('sendCustomer', customer);
  });
  socket.on('updateCustomer', function (data) {
    console.log(data);
	customer=data;
	io.sockets.emit('sendCustomer', customer);
  });
});