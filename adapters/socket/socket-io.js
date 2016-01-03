var config = require('../../config/config'),
    _ = require('lodash'),
    server = require('http').createServer();
io = require('socket.io')(server);

var Socket = function SocketIo(_config) {

    this.config = {};

    _.extend(this.config, config, _config);

    this.init();
    this.run();
};

Socket.prototype.init = function SocketIoInit() {
    io.on(config.events.connection, function (socket) {
        console.log('user connected!');
        socket.on(config.events.disconnect, function () {
            console.log('user disconnected!');
        });
        socket.on('testEvent', function () {
            console.log('test event fired');
        });
    });
};

Socket.prototype.run = function SocketIoRun() {
    var socketPort = this.config.socketPort || this.config.defaults.socketPort;
    console.log('socket-io server running on port', socketPort);
    server.listen(socketPort);
};

module.exports = Socket;