var config = require('../config/config'),
    Database = require('./Database'),
    _ = require('lodash');

var Crud = function(_config) {
    this.config = {};
    _.extend(this.config, config, _config);

    var database = new Database();
    this.database = database.getMongoose();

};

Crud.prototype.create = function(socket, data) {

    var Model = this.getModel(data.modelName),
        model = new Model(),
        modelData = data.data,
        fields = this.getFields(data.modelName);

    _.forEach(fields, function(value, key) {
        if(modelData[key]) {
            model[key] = modelData[key];
        }
    });

    model.save(function(error) {
        socket.emit(this.config.events.didCreate, {
            model: model,
            error: error
        });

    }.bind(this));
};

Crud.prototype.find = function(socket, options) {

    var Model = this.getModel(options.modelName),
        query = options.query || {};

    Model.find(query, function(error, model) {
        // show the one user
        socket.emit(this.config.events.didFind, {
            model: model,
            error: error
        })
    }.bind(this));
};

Crud.prototype.findById = function(socket, options) {

    var Model = this.getModel(options.modelName);

    Model.findById(options.id, function(error, model) {
        socket.emit(this.config.events.didFindById, {
            model: model,
            error: error
        });

    }.bind(this));
};

Crud.prototype.update = function(socket, options) {

    var Model = this.getModel(options.modelName);

    var query = options.query,
        data = options.data;

    Model.findOneAndUpdate(query, data, function(error, model) {

        // If it passes back a model it was a success
        socket.emit(this.config.events.didUpdate, {
            model: model,
            fields: data,
            error: error
        });

    }.bind(this));
};

Crud.prototype.updateById = function(socket, options) {
    var Model = this.getModel(options.modelName);

    var id = options.id,
        data = options.data;

    Model.findByIdAndUpdate(id, data, function(error, model) {

        // If it passes back a model it was a success
        socket.emit(this.config.events.didupdateById, {
            model: model,
            fields: data,
            error: error
        });

    }.bind(this));
};

Crud.prototype.delete = function(socket, options) {
    var Model = this.getModel(options.modelName);

    Model.findOneAndRemove(options.query, function(error) {
        socket.emit(this.config.events.didDelete, {
            error: error
        });

    }.bind(this));
};

Crud.prototype.deleteById = function(socket, options) {
    var Model = this.getModel(options.modelName);

    Model.findByIdAndRemove(options.id, function(error) {
        socket.emit(this.config.events.didDeleteById, {
            error: error
        });

    }.bind(this));
};

Crud.prototype.getModel = function(modelName) {

    return this.database.model(modelName);

};

Crud.prototype.getFields = function(modelName) {

    return require('../schemas/' + modelName).fields;

};

module.exports = Crud;