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

    add(req, res) {
        if(req.query.data) {
            Database.table("test").insert({
                data: req.query.data
            }).then(function(data) {
                res.send("Added! <a href='/db'>Back to search</a>.");
            });
        } else {
            res.render('db/add');
        }
    }
}

module.exports = DatabaseController;
