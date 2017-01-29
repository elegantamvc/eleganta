const validate = require('./helpers/validate');
class Controller {
    
    constructor() {

    }

    validate(req, rules) {
        return validate(req, rules);
    }
}

module.exports = Controller;
