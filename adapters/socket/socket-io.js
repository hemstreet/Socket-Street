var config = require('../../config/config'),
    _ = require('lodash'),
    server = require('http').createServer();
    io = require('socket.io')(server);

var Socket = function(_config) {

    this.config = {};

    _.extend(this.config, config, _config);

    this.init();
    this.run();
};

Socket.prototype.init = function() {
    io.on(config.events.connection, function (socket) {
        console.log('user connected!');
        socket.on(config.events.disconnect, function () {
            console.log('user disconnected!');
        });

        //socket.on('testEvent', function (data) {
        //    console.log('test event fired', data);
        //});

    });
};

Socket.prototype.run = function() {
    var socketPort = this.config.socketPort || this.config.defaults.socketPort;
    console.log('socket-io server running on port', socketPort);
    server.listen(socketPort);
};

module.exports = Socket;