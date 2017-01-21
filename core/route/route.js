/**
 * Route class to be called in our router
 * for setting up different types of classes;
 */
class Route {

    /**
     * Contructor method
     * @param {String} projectPath - Path of website to run;
     */
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.routesPath = 'app/routes';
    }


    /**
     * Our HTTP GET method for setting up a new routes
     * linked to a controller
     * @param {String} path - Url path of the webapp to point to;
     * @param {String} controllerString - String containing controller and
     * action  seperated by an @;
     */
    get(path, controllerString) {

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
            path: this.projectPath+'/'+this.routesPath+'/'+stringArgs[0],
            method: stringArgs[1],
        };

        return controller;
    }
}

module.exports = new Route();
