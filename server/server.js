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

    socket.on(config.events.willCreate, function(data) {
        crud.create(socket, data);
    });

    socket.on(config.events.willFind, function(data) {
        crud.find(socket, data);
    });

    socket.on(config.events.willFindById, function(data) {
        crud.findById(socket, data);
    });

    socket.on(config.events.willUpdate, function(data) {
        crud.update(socket, data);
    });

    socket.on(config.events.willUpdateById, function(data) {
        crud.updateById(socket, data);
    });

});