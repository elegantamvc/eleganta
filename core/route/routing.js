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
