const Routing = require('./routing');

/**
 * Router class, unlike the routes class this class
 * limits the scope of all calls and middleware to a specific
 * route, allowing for more granular middleware and better
 * route organization. This class is also not static as there can better
 * multiple instances of it
 */
class Router extends Routing {
    /**
     * Constructor method setting up basic values
     * @param {Express} express instance of express js.
     */
    constructor(express) {
        super(express);
        this.router = express.Router();
    }
}

module.exports = Router;
