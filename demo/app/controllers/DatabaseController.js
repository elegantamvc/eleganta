const Database = require(process.cwd() + '/../core.js').Database;

class DatabaseController {
    index(req, res) {
        res.render('db/index');
    }

    find(req, res) {
        console.log(req.params);
        console.log(req.body);
        console.log(req.query);
        console.log(req.param("id"));

        res.send("What");

        /*res.render('db/index', {
            result: null
        });*/
    }
}

module.exports = DatabaseController;
