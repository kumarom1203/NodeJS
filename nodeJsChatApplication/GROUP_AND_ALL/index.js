var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
	console.log('a user connected');

    socket.on('chat_message', function(msg){
		console.log(msg);
    	io.emit('chat_message', msg);
	});

	socket.on('room', function(room) {
		console.log('SOME ONE JOIN THE ROOM ', room);
        socket.join(room);
	});

	socket.on('room_chat', function(room, msg) {

		console.log(room);
		console.log(msg);

		io.sockets.in(room).emit('chat_message', 'what is going on, party people? '+room);
        
	});
	
	


  	socket.on('disconnect', () => {
    	console.log('user disconnected');
  	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
