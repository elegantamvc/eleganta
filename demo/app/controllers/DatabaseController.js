const Database = require(process.cwd() + '/../core.js').Database;

class DatabaseController {
    index(req, res) {
        res.render('db/index');
    }
}

module.exports = DatabaseController;
