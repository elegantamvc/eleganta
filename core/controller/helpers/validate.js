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
                break;
            case 'alpha':
                error = alpha(name, value);
                break;
            case 'numeric':
                error = numeric(name, value);
                break;
        }
        if(error != '') {
            errors.push(error);
        }
    });
}


/**
 * Checks to see if the value passes the required check.
 * @param  {string} name
 * @param  {Any} value
 * @return {String} - Error message or lack of one.
 */
function required(name, value) {
    return value != null && value != '' ? '' : name+' cannot be null or empty.';
}

/**
 * Checks to see if the value passes the alpha check.
 * @param  {string} name
 * @param  {Any} value
 * @return {String} - Error message or lack of one.
 */
function alpha(name, value) {
    if(/^[a-zA-Z]+$/.test(value)) {
        return '';
    }else {
        return name + ' must contain only alpha characters';
    }
}

/**
 * Checks to see if the value passes the numeric check.
 * @param  {string} name
 * @param  {Any} value
 * @return {String} - Error message or lack of one.
 */
function numeric(name, value) {
    if(/^\d+$/.test(value)) {
        return '';
    }else {
        return name + ' must contain only number characters';
    }
}



