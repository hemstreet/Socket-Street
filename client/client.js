var io = require('socket.io/node_modules/socket.io-client');

client = io.connect('http://localhost:3000');

client.on('connect',function() {

    setTimeout(function() {
        client.emit("Event:will-create", {
            data: "server client"
        });
    }, 2000);

    client.on('Event:did-create', function(data) {
        console.log(data);
    });

    client.on('globalEvent', function(data) {
        console.log('global event', data);
    })

});