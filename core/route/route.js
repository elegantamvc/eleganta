/**
 * Static class that will be imported
 * by users to register routes to for
 * their web app.
 */
class Route {

    /**
     * Contructor method
     * @param {String} projectPath - Path of website to run
     * @param {Express} express - Instance of Express.js
     */
    constructor(projectPath, express) {
        this.projectPath = projectPath;
        this.controllerPath = 'app/controllers';
        this.express = express;
    }


    /**
     * Our HTTP GET method for setting up a new routes
     * linked to a controller
     * @param {String} path - Url path of the webapp to point to;
     * @param {String} controllerString - String containing controller and
     * action  seperated by an @;
     */
    get(path, controllerString) {
        let controllerConfig = this.parseControllerString(controllerString);
        let Controller = require(controllerConfig.path);
        let control = new Controller();
        this.express.get(path, control[controllerConfig.method]);
    }

    /**
     * Method to parse out the controller string
     * in to an object with path and method
     * string property
     * @param {String} controllerString - The string passed in to the route
     * class containing the controller and method.
     * @return {Object} - Object with path and method string properties;
     */
    parseControllerString(controllerString) {
        let stringArgs = controllerString.split('@');
        let controller = {
            path: this.projectPath+'/'+this.controllerPath+'/'+stringArgs[0],
            method: stringArgs[1],
        };

        return controller;
    }
}

module.exports = Route;
