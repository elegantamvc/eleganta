const fs = require('fs');

class EnvironmentHelper {

    constructor(filename) {
        this.filename = filename;
        this.values = require(this.filename);
    }

    register(key, data) {
        this.values[key] = data;
    }

    getValue(key) {
        let x = 0, searchObj = this.values, splitKey = key.split(".");

        for(x = 0; x < splitKey.length; x++) {
            let keyNode = splitKey[x];

            if(searchObj[keyNode]) {
                if(x >= splitKey.length - 1) {
                    return searchObj[keyNode];
                } else {
                    searchObj = searchObj[keyNode];
                }
            } else {
                return "";
            }
        }

        if(this.values[key]) {
            return this.values[key];
        } else {
            return "";
        }
    }

    hasValue(key) {
        return typeof this.values[key] !== 'undefined';
    }

}

module.exports = EnvironmentHelper;