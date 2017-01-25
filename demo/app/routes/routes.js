const Route = require(process.cwd()+'/../core.js').Route;

Route.use(function(req, res, next) {
    console.log(req.url + ': ' +req.method);
    next();
});
Route.get('/', 'hotdog@index');

Route.get('/hotdog', 'hotdog@wow');

Route.get('/dog', 'hotdog@dog');

// Database
Route.get('/db', 'DatabaseController@index');
Route.get('/db/add', 'DatabaseController@add');

require('./hotdog/dog');

// We grab our harambe router and register it
// to the /harambe path of the app
let harambe = require('./harambe');
Route.use('/harambe', harambe);