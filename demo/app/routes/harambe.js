let Router = require(process.cwd()+'/../core.js').Router;
let router = new Router();

router.use(function(req, res, next) {
    console.log('this is harambe teir middleware');
    next();
});

router.get('/', function(req, res) {
    res.send('Harambe home');
});

router.get('/hotdog', function(req, res) {
    res.send('Harambe hotdog');
});

module.exports = router;
