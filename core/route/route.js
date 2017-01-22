/**
 * Static class that will be imported by users to register routes to for their
 * web app.
 */
class Route {


    /**
     * Contructor method
     * 
     * @param {Express} express - Instance of Express.js
     */
    constructor(express) {
        this.projectPath = process.cwd();
        this.controllerPath = 'app/controllers';
        this.express = express;
        this.controllers = [];
        this.controllerMapping = {};
    }


    /**
     * Our HTTP GET method for setting up a new routes linked to a controller
     * 
     * @param {String} path - Url path of the webapp to point to
     * 
     * @param {String} controllerString - String containing controller and
     * action seperated by an @
     */
    get(path, controllerString) {
        this.express.get(path, this.getControllerMethod(controllerString));
    }

    /**
     * Our HTTP PUT method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerString
     */
    put(path, controllerString) {
        this.express.put(path, this.getControllerMethod(controllerString));
    }

    /**
     * Our HTTP POST method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerString
     */
    post(path, controllerString) {
        this.express.post(path, this.getControllerMethod(controllerString));
    }

    /**
     * Our HTTP DELETE method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerString
     */
    delete(path, controllerString) {
        this.express.delete(path, this.getControllerMethod(controllerString));
    }


    /**
     * Method for grabbing the method mentioned in the controller string and
     * caching existing controllers
     * 
     * @param {String} controllerString
     * 
     * @return {Function} - The method from the controller
     */
    getControllerMethod(controllerString) {
        let controllerConfig = this.parseControllerString(controllerString);
        let path = controllerConfig.path;
        let method = controllerConfig.method;
        let arrayIndex = this.controllerMapping[path];

        if(arrayIndex != undefined) {
            return this.controllers[arrayIndex][method];
        }else {
            this.controllerMapping[path] = this.controllers.length;
            let Controller = require(path);
            this.controllers.push(new Controller);
            return this.controllers[this.controllers.length-1][method];
        }
    }


    /**
     * Method to parse out the controller string in to an object with path and
     * method string property
     * 
     * @param {String} controllerString - The string passed in to the route
     * class containing the controller and method
     * 
     * @return {Object} - Object with path and method string properties
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
