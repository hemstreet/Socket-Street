var io = require('socket.io').listen(3000),
    config = require('./config/config'),
    Crud = require('./lib/Crud'),
    _ = require('lodash'),
    crud = new Crud({
        io: io
    });

// Global event via io.sockets
//io.sockets.emit('globalCreate', client);

//Local event via socket.on
//socket.on("EVENT:did-create", function(data) {

io.sockets.on('connection', function (socket) {

    socket.on("Event:will-create", function(data) {

        console.log('event will create');
        crud.create(socket, data);
    });

    socket.on("EVENT:globalEvent", function(data) {
        io.sockets.emit('globalEvent', data);
    });

});