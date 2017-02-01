const Database = require(process.cwd() + '/../core.js').Database;
const Controller = require(process.cwd()+'/../core.js').Controller;

class hotdog extends Controller {

    index(req, res) {
        res.render('index');
    }

    wow(req, res) {
        res.send('Wow I love hotdogs');
    }

    dog(req, res) {
        this.test();
        res.send('le dog');      
    }

    wutang(req, res) {
        Database.table("test").find(1).then(function(data) {
            res.send('wutang son! Also,<br />' + JSON.stringify(data));
        });
    }

    dogs(req, res) {
        res.render('hotdog/dog', {hotdogs: req.params.number});
    }

    form(req, res) {
        this.validate(req, res, {
            firstname: 'required|alpha|max:3',
        });
        //res.render('hotdog/form', {form: req.body});
    }

    test() {
        console.log('BOOOIII');
    }
}

module.exports = hotdog;
