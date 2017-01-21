const Cli = require('./cli/cli');
const express = require('express');
const Route = require('./core/route/route');
const args = process.argv;
let app = express();

// Just a dumb check at the moment to prevent the
// cli from doing extra work.
if(args.length > 2) {
    Cli.runEleganta(args);
}

/**
 * Our static Route class that can be called to created
 * new routes on the fly
 */
module.exports.Route = new Route(process.cwd(), app);


/**
 * Our method for starting the server it self.
 * It will import the routes file and with a
 * copy of the express context. The routes class
 * then uses that context to register routes with
 * express. :)
 */
module.exports.startServer = function() {
    // Register all our routes with express
    let Routes = require(process.cwd()+'/app/routes/routes');

    // Run the express server on port 3000
    // Port number will be moved to the config later.
    app.listen(3000, () => {
        console.log('Eleganta is running!');
    });
};


