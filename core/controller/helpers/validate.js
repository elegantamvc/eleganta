module.exports = (request, rules) => {
    for(let property in rules) {
        analyze(request.body[property], rules[property]);
    }
};
/**
 * Method for analzing a rule
 * @param {Any} value - value to check rule against
 * @param {String} rule - rule string
 */
function analyze(value, rule) {
    let conditions = rule.split('|');
    conditions.forEach( (condition) => {

    });
}

