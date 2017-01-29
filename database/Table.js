const MysqlQueryBuilder = require("./drivers/builders/MysqlQueryBuilder.js");

class Table {

    constructor(name, Driver) {
        this.tableName = name;
        this.driver = new Driver();
    }

    /**
     * Makes a query against the database with the given queryString.
     * 
     * @param {string} queryString the query string to be executed on the
     * database. This string is NOT escaped in any way
     * 
     * @returns {Promise} resolves to the result of the query
     */
    query(queryString) {
        return this.driver.query(queryString);
    }

    /**
     * Attempts to find a record with the specified ID in the table.
     * 
     * @param {uint} id the ID of the record to find
     * 
     * @returns {Promise} resolves to the record if the record is found or null
     * if it is not
     */
    find(id) {
        let builder = new MysqlQueryBuilder(this.tableName, "SELECT");
        builder.where("id", id);

        return builder.get((rawResults) => {
            return rawResults ? rawResults[0] : null;
        });
    }

    /**
     * Inserts a new record into the table given the specified data.
     * 
     * @param {Object} data map of data to be added into the table
     * 
     * @returns {Promise} resolves to a boolean: true if the insert was
     * successful or false if otherwise
     */
    add(data) {
        let builder = new MysqlQueryBuilder(this.tableName, "INSERT");
        builder.setInsertData(data);

        return builder.get();
    }

    /**
     * Removes a record from the table given the record's ID.
     * 
     * @param {uint} id the ID of the record to search for in the table 
     * 
     * @returns {Promise} resolves to a boolean: true if the remove was 
     * successful or false if otherwise
     */
    remove(id) {
        let builder = new MysqlQueryBuilder(this.tableName, "DELETE");
        builder.where("id", id);

        return builder.get();
    }

    /**
     * Retrieves all records for this table.
     * 
     * @returns {Promise} resolves to an array of all of the records for this 
     * table.
     */
    all() {
        let builder = new MysqlQueryBuilder(this.tableName, "SELECT");

        return builder.get();
    }

}

module.exports = Table;