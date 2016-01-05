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
        if(error) {
            socket.emit(this.config.events.didErrorOnCreate, {
                error: error
            });

            return;
        }

        socket.emit(this.config.events.didCreate, {
            model: model
        });

    }.bind(this));
};

Crud.prototype.find = function(socket, options) {

    var Model = this.getModel(options.modelName),
        query = options.query || {};

    Model.find(query, function(error, model) {
        if (error) {
            console.log(error);
            return;
        }

        // show the one user
        socket.emit(this.config.events.didFind, {
            model: model
        })
    }.bind(this));
};

Crud.prototype.findById = function(socket, options) {

    var Model = this.getModel(options.modelName);

    Model.findById(options.id, function(error, model) {
        if(error) {
            socket.emit(this.config.events.didErrorOnFindById, {
                error: error
            });
            return;
        }

        socket.emit(this.config.events.didFindById, model);

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
            fields: data
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
            fields: data
        });

    }.bind(this));
};

Crud.prototype.delete = function(socket, options) {
    console.log('delete logic');
};

Crud.prototype.getModel = function(modelName) {

    return this.database.model(modelName);

};

Crud.prototype.getFields = function(modelName) {

    return require('../schemas/' + modelName).fields;

};

module.exports = Crud;