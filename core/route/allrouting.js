/**
 * Parent class of all publicing exposed routing operators.
 * This allows for uniform eleganta featurs to be included
 * in different express.js routing opperations.
 */
class Routing {

    /**
     * Contructor class for all routing opperations
     * @param {Express} express - Instance of express.js app
     */
    constructor(express) {
        this.projectPath = process.cwd();
        this.controllerPath = 'app/controllers';
        this.express = express;
        this.controllers = [];
        this.controllerMapping = {};
        this.router = this.express;
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
        this.router.get(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP PUT method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    put(path, controllerAction) {
        this.router.put(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP POST method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    post(path, controllerAction) {
        this.router.post(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Our HTTP DELETE method for setting up a new routes
     * 
     * @param {String} path - url path of the webapp to point to
     * 
     * @param {String} controllerAction
     */
    delete(path, controllerAction) {
        this.router.delete(path, this.getControllerMethod(controllerAction));
    }

    /**
     * All method that will create an HTTP endpoint for all four types.
     * @param{String} path - url path of the webapp to point to
     * 
     * @param{String} controllerAction
     */
    all(path, controllerAction) {
        this.router.all(path, this.getControllerMethod(controllerAction));
    }

    /**
     * Method used to import routes and creating middleware for the appliation
     * @param {path} path - path for middleware or function
     * @param {Object} routerObject - Router object or function for middleware
     */
    use(path, routerObject) {
        if(typeof path == 'string') {
            this.router.use(path, routerObject.router);
        } else {
            this.router.use(path);
        }
    }

    /**
     * Match Method
     * @param {String[]} methods - Array of methods to use for a route
     * @param {String} path - Path for routing
     * @param {String|Function} controllerAction
     */
    match(methods, path, controllerAction) {
        const allowedMethod = ['get', 'post', 'put', 'delete'];
        if(allowedMethod.indexOf(method.toLowerCase()) > -1) {
            methods.forEach((method) => {
                this[method.toLowerCase()](path, controllerAction);
            });
        } else {
            let errorMessage = 'Eleganta Error: `';
            errorMessage += method.toLowerCase();
            errorMessage +='` is not a valid method type';
            console.log(errorMessage);
        }
    }

    /**
     * Method for grabbing the method mentioned in the controller string and
     * caching existing controllers
     *
     * @param {String} controllerAction
     *
     * @return {Function} - The method from the controller
     */
    getControllerMethod(controllerAction) {
        if(typeof controllerAction == 'string') {
            let controllerConfig = this.parsecontrollerAction(controllerAction);
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
        }else if(typeof controllerAction == 'function') {
            return controllerAction;
        }
    }


    /**
     * Method to parse out the controller string in to an object with path and
     * method string property
     * 
     * @param {String} controllerAction - The string passed in to the route
     * class containing the controller and method
     * 
     * @return {Object} - Object with path and method string properties
     */
    parsecontrollerAction(controllerAction) {
        let stringArgs = controllerAction.split('@');

        let controller = {
            path: this.projectPath+'/'+this.controllerPath+'/'+stringArgs[0],
            method: stringArgs[1],
        };

        return controller;
    }
}

module.exports = Routing;
