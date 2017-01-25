const Route = require(process.cwd()+'/../core.js').Route;

Route.get('/', 'hotdog@index');

Route.get('/hotdog', 'hotdog@wow');

Route.get('/dog', 'hotdog@dog');

// Database
Route.get('/db', 'DatabaseController@index');
Route.post('/db', 'DatabaseController@find');

require("./hotdog/dog.js");
