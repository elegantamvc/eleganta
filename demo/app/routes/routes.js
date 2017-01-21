const Route = require(process.cwd()+'/../core.js').Route;

Route.get('/', 'hotdog@index');

Route.get('/hotdog', 'hotdog@wow');

