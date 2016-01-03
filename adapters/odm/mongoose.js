var config = require('../../config/config'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Mongoose = function(_config) {
    this.config = {};

    _.extend(this.config, config, _config);

    this.init();
};

Mongoose.prototype.init = function() {
    mongoose.connect('mongodb://localhost/socketServer');
};

Mongoose.prototype.model = function(name) {

    var schema = require('../../model/schema/' + name + '.js'),
        Model = mongoose.model(name, schema);

    return Model;
};

Mongoose.prototype.save = function(model) {


};

Mongoose.prototype.create = function(name, data) {

    var Model = this.model(name);
    var model = new Model(data);

    model.save(function (err) {
        if (err) {
            console.log('Error saving model', name, data);
            return;
        }

        console.log('Model saved');
    });
};

Mongoose.prototype.find = function(modelName, query) {
    return this.model(modelName).find(query || '');
};

module.exports = Mongoose;
