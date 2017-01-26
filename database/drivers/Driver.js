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
     * @returns {Promise} - resolves to whatever object or array of objects that
     * database would return given the query
     */
    query(queryString) {
        throw new NotImplementedError("query() method not implemented.");
    }

    /**
     * Action to find a record in the specified collection given the specified 
     * record ID
     * 
     * @param {uint} id the unique ID of the record/data to find 
     * 
     * @param {string} collectionName the name of the collection to search in
     * 
     * @returns {Promise} resolves to the specific record that was found or null
     * if a record with the specified ID could not be found
     */
    find(id, collectionName) {
        throw new NotImplementedError("find() method not implemented.");
    }

    /**
     * Action to add a new record to the specified collection given the
     * specified data.
     * 
     * @param {Object} data a map of data to create the record in the database
     * 
     * @param {string} collectionName the name of the collection to add the new 
     * entry into 
     * 
     * @returns {Promise} resolves to a boolean: true if the addition was
     * successful or false otherwise
     */
    add(data, collectionName) {
        throw new NotImplementedError("add() method not implemented.");
    }

    /**
     * Action to remove a record (found by the specified ID) from the given 
     * collection specified by the collection name.
     * 
     * @param {uint} id the id of the record to remove
     * 
     * @param {string} collectionName the name of the collection to search in
     * and remove from 
     * 
     * @return {Promise} resolves to a boolean: true if the removal succeeded,
     * or false otherwise
     */
    remove(id, collectionName) {
        throw new NotImplementedError("remove() method not implemented.");
    }

}

module.exports = Driver;