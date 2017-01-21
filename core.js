console.log('Core.js: ' + process.cwd());
const Cli = require('./cli/cli');
const express = require('express');
const Route = require('./core/route/route');
const args = process.argv;
let app = express();
if(args.length > 0) {
    Cli.runEleganta(args);
}
module.exports.Route = new Route(process.cwd(), app);
module.exports.startServer = function() {
    let Routes = require(process.cwd()+'/app/routes/routes');
    app.listen(3000, () => {
        console.log('Eleganta is running!');
    });
};


