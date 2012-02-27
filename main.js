var app = require('express').createServer()
	, io = require('socket.io').listen(app);

app.listen(11999);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.broadcast.emit('chatmsg', 'New user connected.');
	socket.emit('chatmsg', 'Connected.');
	socket.on('chatmsg', function (msg, callback) {
		io.sockets.emit('chatmsg', 'Anonymous: ' + msg);
		callback();
	});
});