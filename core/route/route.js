const Routing = require('./allrouting');

/**
 * Static class that will be imported by users to register routes to for their
 * web app.
 */
class Route extends Routing {


    /**
     * Contructor method
     *
     * @param {Express} express - Instance of Express.js
     */
    constructor(express) {
        super(express);
        this.router = express;
    }

}

module.exports = Route;
