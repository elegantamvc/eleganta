module.exports = (request, rules) => {
    for(let property in rules) {
        analyze(property, request.body[property], rules[property]);
    }
};
/**
 * Method for analzing a rule
 * @param {String} name - name of value
 * @param {Any} value - value to check rule against
 * @param {String} rule - rule string
 */
function analyze(name, value, rule) {
    rule = rule.toLowerCase();
    let conditions = rule.split('|');
    let errors = [];

    conditions.forEach( (condition) => {
        let error = '';
        switch(condition) {
            case 'required':
            error = required(name, value);

        }      
        if(error != '') {
            errors.push(error);
        }
    });
}

function required(name, value) {
    return value != null && value != '' ? '' : name+' cannot be null or empty.';
}

