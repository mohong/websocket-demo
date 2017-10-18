
var express = require('express');
var app = express();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8181});
var client = require('./client');

var getWs = new Promise((resolve, reject) => {
	wss.on('connection', function(ws) {
		resolve(ws);
	});
});

app.get('/', function (req, res) {
  var name = req.query.name;
  console.log(name);
  client.rpush('name', name);
  getWs.then(ws => {
  	ws.send(name);
  });
  res.send('ok');
  // client.lrange('name', 0, -1, function(err, data) {
  // 	res.send(data);
  // 	getWs.then(ws => {
  // 		ws.send(data.toString());
  // 	});
  // });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});