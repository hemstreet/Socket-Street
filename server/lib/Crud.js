var config = require('../config/config'),
    _ = require('lodash');

var Crud = function(_config) {
    this.config = {};
    _.extend(this.config, config, _config);

    this.mongoose = require('mongoose');
    this.mongoose.connect(this.config.mongo);

    var EventSchema = new this.mongoose.Schema({
        title     : { type: String, default: 'test event' },
        body      : { type: String, default: 'test body' }
    });

    this.mongoose.model('Event', EventSchema);

    this.MyModel = this.mongoose.model('Event');
};

Crud.prototype.create = function(socket, data) {

    var event = new this.MyModel();

    event.title = "new test title";

    event.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }

        socket.emit(this.config.events.didCreate, {
            message: "success",
            model: "sdf"
        });

    }.bind(this));
};

Crud.prototype.read = function() {
    console.log('read logic');
};

Crud.prototype.update = function() {
    console.log('update logic');
};

Crud.prototype.delete = function() {
    console.log('delete logic');
};

module.exports = Crud;