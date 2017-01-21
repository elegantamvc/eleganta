class hotdog  {
    index(req, res) {
        res.send('Hello hotdog world, how are you?');
    }

    wow(req, res) {
        res.send('Wow I love hotdogs');
    }

    dog(req, res) {
        res.send('le dog');
    }

    wutang(req, res) {
        res.send('wutang son!');
    }
}

module.exports = hotdog;
