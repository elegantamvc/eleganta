const Route = require(process.cwd()+'/../core.js').Route;

Route.get('/custom', 'hotdog@wutang');
Route.get('/dog/:number', 'hotdog@dogs');
