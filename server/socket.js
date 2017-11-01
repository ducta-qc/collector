var io = global.io;

function setupSocket(){
  io.on('connection', function (socket){
    console.log('A client connected');
    require('./handlers/socket/ner').setup(socket);
    socket.on('disconnect', function () {
      console.log('A client disconnected');
    })
  });

}

module.exports = {
	setupSocket:setupSocket
};