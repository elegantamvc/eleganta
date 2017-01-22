const Route = require(process.cwd()+'/../core.js').Route;

Route.get('/custom', 'hotdog@wutang');
Route.get('/dog/:number', 'hotdog@dogs');
Route.get('/hot/dog', (req, res) => {
    res.send('This is one hot dog main');
});
