const Database = require(process.cwd() + '/../core.js').Database;

class hotdog {
    index(req, res) {
        res.render('index');
    }

    wow(req, res) {
        res.send('Wow I love hotdogs');
    }

    dog(req, res) {
        res.send('le dog');
    }

    wutang(req, res) {
        Database.table("test").query("SELECT * FROM test");

        res.send('wutang son!');
    }

    dogs(req, res) {
        res.render('hotdog/dog', {hotdogs: req.params.number});
    }
}

module.exports = hotdog;
