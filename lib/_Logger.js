var config = require('../config/config'),
    _ = require('lodash');

var Logger = function(_config) {
    this.config = {};

    _.extend(this.config, config, _config);

    this.init();
};

Logger.prototype.init = function() {
    this.odm = new require('../adapters/odm/Mongoose')();
};

Logger.prototype.create = function(modelName, data) {
    this.odm.create(modelName, data);
};

Logger.prototype.get = function(modelName, query) {
    console.log(this.odm.find(modelName, query));
};

module.exports = Logger;