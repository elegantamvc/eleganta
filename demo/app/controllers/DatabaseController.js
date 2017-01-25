const Database = require(process.cwd() + '/../core.js').Database;

class DatabaseController {
    index(req, res) {
        if(req.query.id) {
            Database.table("test").find(req.query.id).then(function(data) {
                res.render('db/index', {
                    result: data
                });
            });
        } else {
            res.render('db/index');
        }
    }
}

module.exports = DatabaseController;
