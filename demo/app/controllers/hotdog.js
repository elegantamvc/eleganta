class hotdog  {
    index(req, res) {
        res.send('Hello hotdog world, how are you?');
    }

    wow(req, res) {
        res.send('Wow I love hotdogs');
    }
}

module.exports = hotdog;
