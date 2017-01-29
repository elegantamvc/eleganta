const Route = require(process.cwd()+'/../core.js').Route;

Route.use(function(req, res, next) {
    console.log(req.url + ': ' +req.method);
    next();
});
Route.get('/', 'hotdog@index');

Route.get('/hotdog', 'hotdog@wow');

Route.get('/dog', 'hotdog@dog');
Route.match(['get', 'post'], '/llama', (req, res) => {
    res.send('Llama page for your info');
});

Route.get('/broken', (req, res) => {
    let number = 10.5;
    number.split('@');
    res.send(number);
});

// Database
Route.get('/db', 'DatabaseController@index');
Route.get('/db/add', 'DatabaseController@add');
Route.get('/db/delete', 'DatabaseController@delete');

require('./hotdog/dog');

// We grab our harambe router and register it
// to the /harambe path of the app
let harambe = require('./harambe');
Route.use('/harambe', harambe);