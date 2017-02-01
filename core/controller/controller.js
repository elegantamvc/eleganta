const validate = require('./helpers/validate');
/**
 * Class for all eleganta controllers
 * to inheret from
 */
class Controller {

    /**
     * Method for validating requests
     * @param {Object} req - Request from express
     * @param {Object} res - Response from express
     * @param {Object} rules - Set of rules to validate against
     * @return {String[]} - Array of strings
     */
    validate(req, res, rules) {
        return validate(req, res, rules);
    }
}

module.exports = Controller;
