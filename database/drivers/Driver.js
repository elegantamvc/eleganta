const NotImplementedError = require("./../../exceptions/NotImplementedError.js");

/**
 * Driver class that represents a generic database driver, and all that entails.
 */
class Driver {

    constructor() {
        this.type = "default";
    }

    /**
     * Represents the execution of a generic query on the database, whatever 
     * that means for any specific type of database engine.
     * 
     * @param {string} queryString - the string representation of the query
     * 
     * @returns {Object|Array} - whatever object or array of objects that that 
     * database would return given the query
     */
    query(queryString) {
        throw new NotImplementedError("query() method not implemented.");
    }

    find(id, collectionName) {
        throw new NotImplementedError("find() method not implemented.");
    }

    add(data, collectionName) {
        throw new NotImplementedError("add() method not implemented.");
    }

}

module.exports = Driver;