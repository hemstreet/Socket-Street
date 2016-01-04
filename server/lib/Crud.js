var config = require('../config/config'),
    Database = require('./Database'),
    _ = require('lodash');

var Crud = function(_config) {
    this.config = {};
    _.extend(this.config, config, _config);

    var database = new Database();
    this.mongoose = database.getMongoose();

};

Crud.prototype.create = function(socket, data) {

    var Model = this.mongoose.model(data.modelName),
        model = new Model(),
        modelData = data.data,
        fields = require('../schemas/' + data.modelName).fields;

    _.forEach(fields, function(value, key) {
        if(modelData[key]) {
            model[key] = modelData[key];
        }
    });

    model.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }

        socket.emit(this.config.events.didCreate, {
            message: "success",
            model: model
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