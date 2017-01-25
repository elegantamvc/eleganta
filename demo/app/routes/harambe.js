let Router = require(process.cwd()+'/../core.js').Router;
let router = new Router();

// Our middleware just for harambe level routes
router.use(function(req, res, next) {
    console.log('this is harambe teir middleware');
    next();
});


//Our harambe tier routes

// /harambe
router.get('/', function(req, res) {
    res.send('Harambe home');
});
// /harambe/hotdog
router.get('/hotdog', function(req, res) {
    res.send('Harambe hotdog');
});

module.exports = router;
