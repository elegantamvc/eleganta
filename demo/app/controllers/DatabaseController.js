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
            Database.table("test").query("SELECT * FROM `test`;").then(function(data) {
                res.render('db/index', {
                    list: data
                });
            });
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

    delete(req, res) {
        if(req.query.id) {
            Database.table("test").remove(req.query.id).then((result) => {
                res.redirect("/db");
            });
        } else {
            res.redirect("/db");
        }
    }
}

module.exports = DatabaseController;
