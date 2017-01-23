const filesystem = require('./helpers/filesystem/filesystem');
const Cli = require('./cli/cli');
const express = require('express');
const exphbs = require('express-handlebars');
const Route = require('./core/route/route');
const Router = require('./core/route/router');
const ConfigHelper = require('./helpers/config/config');
const ErrorHandling = require('./core/route/errorHandling');
const args = process.argv;
let app = express();


/**
 * Our static Route class that can be called to created new routes on the fly
 */
module.exports.Route = new Route(app);

module.exports.Router = Router;


/**
 * Our method for starting the server it self. It will import the routes file
 * and with a copy of the express context. The routes class then uses that
 * context to register routes with express. :)
 */
module.exports.startServer = function() {
    let currentPath = process.cwd();

    // Initilize config helper
    let configHelper = new ConfigHelper(currentPath);
    let Config = configHelper.config();

    // Register all our routes with express
    let Routes = [];
    Routes.push(
        require(currentPath + '/' + Config.routesFolder + '/routes.js')
        );

    // Setup error handling to happen after all middlware is registered
    ErrorHandling.setErrors(app);

    // Register our path to our public files resources files
    app.use(express.static(Config.staticFolder));

    // Register our template engine and our views location
    app.set('views', Config.viewsFolder);
    app.engine('.hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');

    // Run the express server on port 3000
    // Port number will be moved to the config later.
    app.listen(Config.port, () => {
        console.log('Eleganta is running at localhost:'+Config.port+'!');
    });
};


// Just a dumb check at the moment to prevent the cli from doing extra work.
if(args.length > 2) {
    let commands = Cli.parseOutCommands(args);

    // COMMAND: eleganta serve
    if(commands.length = 1 && commands[0].toLowerCase() == 'serve') {
        module.exports.startServer();
    }
}


