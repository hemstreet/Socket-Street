var io = require('socket.io').listen(3000);

// Global event via io.sockets
//io.sockets.emit('globalCreate', client);

//Local event via socket.on
//socket.on("EVENT:did-create", function(data) {

var Server = function() {

};

Server.prototype.create = function(socket, data) {

    // Do save logic
    setTimeout(function() {
        console.log("event:did-create");
        socket.emit('EVENT:did-create', {
            message: "success",
            model: data
        })
    }, 2000);

};

var server = new Server();

io.sockets.on('connection', function (socket) {

    socket.on("EVENT:will-create", function(data) {
        server.create(socket, data);
    });

});