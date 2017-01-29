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
        res.send('wutang son!');
    }

    dogs(req, res) {
        res.render('hotdog/dog', {hotdogs: req.params.number});
    }

    form(req, res) {
        this.validate(req, {
            'firstname': 'required',
        });
    }

    test() {
        console.log('BOOOIII');
    }
}

module.exports = hotdog;
