var config = require('../config/config'),
    _ = require('lodash'),
    glob = require("glob");

var Database = function(_config) {

    this.config = {};
    _.extend(this.config, config, _config);

    this.mongoose = require('mongoose');
    this.mongoose.connect(this.config.mongo);

    this.createModels();
};

Database.prototype.createModels = function() {

    var files = glob.sync("server/schemas/*.json");

    _(files).forEach(function(fileName) {
        var name = fileName.split('server/')[1],
            json = require('../' + name),
            schema = new this.mongoose.Schema(json.fields);

        this.mongoose.model(json.name, schema);

    }.bind(this)).value();

};

Database.prototype.getMongoose = function() {
    return this.mongoose;
};

module.exports = Database;

