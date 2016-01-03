var config = require('./config/config'),
    _ = require('lodash'),
    io = require('socket.io-client'),
    path = require('path');

var App = function AppConstructor(_config) {

    this.config = {};

    _.extend(this.config, config, _config);

    this.config.basePath = path.resolve(__dirname);

    this.init();
};

App.prototype.init = function init(){
    this.setupSocketServer({
        basePath: this.config.basePath
    });
    this.setupWebServer({
        basePath: this.config.basePath
    });
};

App.prototype.setupSocketServer = function setupSocketServer() {
    var paths = this.config.paths,
        baseSocketPath = paths['adapters'] + paths['socket'],
        socketModule = this.config.socket || this.config.defaults.socket;

    require(baseSocketPath + socketModule);
};

App.prototype.setupWebServer = function setupWebServer() {
    var paths = this.config.paths,
        baseWebServerPath = paths['adapters'] + paths['webServer'],
        webServerModule = this.config.webServer || this.config.defaults.webServer;

    var WebServer = require(baseWebServerPath + webServerModule );

    this.webServer = new WebServer();

    this.webServer.init();
};

new App();