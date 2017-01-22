const Route = require(process.cwd()+'/../core.js').Route;

Route.use(function(req, res, next) {
    console.log(req);
    next();
});
Route.get('/', 'hotdog@index');

Route.get('/hotdog', 'hotdog@wow');

Route.get('/dog', 'hotdog@dog');

require("./hotdog/dog.js");
