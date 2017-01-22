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
     * @param {String} controllerAction - String containing controller and
     * action seperated by an @
     */
    get(path, controllerAction) {
        this.express.get(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP PUT method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    put(path, controllerAction) {
        this.express.put(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP POST method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    post(path, controllerAction) {
        this.express.post(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP DELETE method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    delete(path, controllerAction) {
        this.express.delete(path, this.getControllerMethod(controllerAction));
    }

    /**
     * All method that will create an HTTP endpoint for all four types.
     * @param{String} path - url path of the webapp to point to
     * 
     * @param{String} controllerAction
     */
    all(path, controllerAction) {
        this.express.all(path, this.getControllerMethod(controllerAction));
    }

}

module.exports = Route;
