module.exports = (request, res, rules) => {
    let totalErrors = [];
    for(let property in rules) {
        if(rules[property] != '' || rules[property] != undefined) {
            let value = request.body[property];
            let errors = analyze(property, value, rules[property]);
            totalErrors = totalErrors.concat(errors);
        }
    }
    
    if(totalErrors.length > 0) {
        res.redirect('back');
        console.log(totalErrors);
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
        let argument = '';
        let conditionArray = condition.split(':');

        if(conditionArray.length > 1) {
            condition = conditionArray[0];
            argument = conditionArray[1];
        }

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
            case 'alphanumeric' || 'alpha_numeric' || 'alpha_num':
                error = alphaNumeric(name, value);
                break;
            case 'max':
                error = max(name, value, argument);
                break;
            case 'string':
                error = string(name, value);
                break;
            case 'boolean' || 'bool':
                error = bool(name, value);
                break;
            case 'number':
                error = number(name, value);
                break;
        }
        if(error != '') {
            errors.push(error);
        }else {
            console.log('succes: '+condition);
        }
    });

    return errors;
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

/**
 * Checks to see if the value passes the alpha numeric check.
 * @param  {string} name
 * @param  {Any} value
 * @return {String} - Error message or lack of one.
 */
function alphaNumeric(name, value) {
    if(/^[a-z0-9]+$/.test(value)) {
        return '';
    }else {
        return name + ' must contain only alpha characters';
    }
}


/**
 * Method to check if the provided string is less than a
 * max value specified by the user
 * @param {String} name - name of the property
 * @param {Any} value - value to check against
 * @param {Number} max - user specified max length
 * @return  {String} - Error message
 */
function max(name, value, max) {
    if(value.length <= max) {
        return '';
    }else {
        return name + ' must be less than ' + max + ' characters long.';
    }
}

/**
 * Method to check if type is string
 * @param {String} name
 * @param {Any} value
 * @return {String}
 */
function string(name, value) {
    if(typeof value == 'string') {
        return '';
    }else {
        return name + ' must be a of type string.';
    }
}

/**
 * Method to check if type is boolean
 * @param {String} name
 * @param {Any} value
 * @return {String}
 */
function bool(name, value) {
    if(typeof value == 'boolean') {
        return '';
    }else {
        return name + ' must be a of type boolean.';
    }
}

/**
 * Method to check if type is number
 * @param {String} name
 * @param {Any} value
 * @return {String}
 */
function number(name, value) {
    if(typeof value == 'number') {
        return '';
    }else {
        return name + ' must be a of type number.';
    }
}
