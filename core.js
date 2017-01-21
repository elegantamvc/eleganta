const filesystem = require('./helpers/filesystem/filesystem');
const Cli = require('./cli/cli');
const express = require('express');
const Route = require('./core/route/route');
const args = process.argv;
let app = express();



/**
 * Our static Route class that can be called to created
 * new routes on the fly
 */
module.exports.Route = new Route(app);


/**
 * Our method for starting the server it self.
 * It will import the routes file and with a
 * copy of the express context. The routes class
 * then uses that context to register routes with
 * express. :)
 */
module.exports.startServer = function() {
    // Register all our routes with express
    filesystem.walkSync(process.cwd()+'/app/routes').forEach((path) => {
        let Routes = require(path);
    });

    // Run the express server on port 3000
    // Port number will be moved to the config later.
    app.listen(3000, () => {
        console.log('Eleganta is running at localhost:3000!');
    });
};

// Just a dumb check at the moment to prevent the
// cli from doing extra work.
if(args.length > 2) {
    let commands = Cli.parseOutCommands(args);

    // COMMAND: eleganta serve
    if(commands.length = 1 && commands[0].toLowerCase() == 'serve') {
        module.exports.startServer();
    }
}


