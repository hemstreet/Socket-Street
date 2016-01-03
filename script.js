var config = require('./config/config'),
    _ = require('lodash'),
    io = require('socket.io-client'),
    path = require('path'),
    Logger = require('./lib/Logger');

var App = function(_config) {

    this.config = {};

    _.extend(this.config, config, _config);

    this.config.basePath = path.resolve(__dirname);
    //this.logger = new Logger();

    this.init();
};

App.prototype.init = function(){
    this.setupSocketServer();
    this.setupWebServer();
    //this.setupLogger();
};

App.prototype.setupSocketServer = function() {
    var paths = this.config.paths,
        baseSocketPath = paths['adapters'] + paths['socket'],
        socketModule = this.config.socket || this.config.defaults.socket;

    var Socket = require(baseSocketPath + socketModule),
        socket = new Socket();
};

App.prototype.setupWebServer = function() {
    var paths = this.config.paths,
        baseWebServerPath = paths['adapters'] + paths['webServer'],
        webServerModule = this.config.webServer || this.config.defaults.webServer;

    var WebServer = require(baseWebServerPath + webServerModule );

    this.webServer = new WebServer({
        basePath: this.config.basePath
    });

    this.webServer.init();
};

App.prototype.setupLogger = function() {

    this.logger.create('Cat', {
        title: 'Test Title'
    });

    this.logger.get('Cat');

    this.logger.get('Cat', {
        title: 'Test Title'
    });

};

new App();