var config = require('../../config/config'),
    _ = require('lodash'),
    express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router();

var Express = function(_config) {

    this.config = {};

    _.extend(this.config, config, _config);

};

Express.prototype.init = function() {

    this.app = express();

    this.app.use(bodyParser.urlencoded({extend: true}));
    this.app.use(bodyParser.json());

    this.app.use('/', router);

    this.setupRoutes();
    this.run();
};

Express.prototype.setupRoutes = function() {
    this.app.get('/', function (req, res) {
        res.sendFile(this.config.basePath + "/" + this.config.paths.views + '/index.html');
    }.bind(this));
};

Express.prototype.run = function() {
    var port = (this.config.webServerPort) ? this.config.webServerPort : this.config.defaults.webServerPort;
    console.log("Web Server running on port", port);
    this.app.listen(port);
};

module.exports = Express;