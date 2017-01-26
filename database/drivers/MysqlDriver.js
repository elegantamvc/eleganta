const Driver = require("./Driver.js");
const ConfigHelper = require("./../../helpers/config/config.js");
const mysql = require('mysql');

class MysqlDriver extends Driver {

    constructor() {
        super();

        let configHelper = new ConfigHelper(process.cwd());

        this.settings = configHelper.getSettingsFiles("database");

        this.connection = mysql.createConnection(env("database.mysql"));
    }

    /**
     * Executes a basic SQL query on the database, and calls the specified 
     * callback with the results of the query.
     * 
     * @param {string} queryString the query to be executed on the database
     * 
     * @param {function=} callback callback function to be called when the SQL 
     * query is complete, used to transform the data of the query before 
     * completing the promise
     * 
     * @return {Promise} a promise that is resolved when the query is complete
     */
    query(queryString, callback) {
        return new Promise((resolve) => {
            this.connection.connect();

            this.connection.query(queryString, (error, results, fields) => {
                if(error) throw error;

                if(callback) {
                    let transformedResults = callback(results);

                    resolve(transformedResults);
                } else {
                    resolve(results);
                }
            });

            this.connection.end();
        });
    }

    /**
     * Finds a specified record in the specified collection by the record's 
     * unique ID
     * 
     * @param {uint} id the unique ID of the record
     * 
     * @param {string} collectionName the name of the table to search in for 
     * the record
     * 
     * @returns {Promise} promise that is resolved when the query is complete, 
     * with the record or null if no record was found
     */
    find(id, collectionName) {
        const queryString = "SELECT * FROM `" + collectionName + "` WHERE id='" + id + "';";

        return this.query(queryString, (results) => {
            return results ? results[0] : null;
        });
    }

    /**
     * Adds a new record to the specified collection, given the correct
     * column data.
     * 
     * @param {Object} data map of columns and data to build the new record
     * 
     * @param {string} collectionName the name of the table to insert into 
     * 
     * @return {Promise} promise that is resolved when the query is complete,
     * which will recieve a boolean: true if the insertion was a success, and 
     * false otherwise
     */
    add(data, collectionName) {
        let queryString = "INSERT INTO `" + collectionName + "` ";
        let columnString = "(";
        let valuesString = "(";

        for (var key in data) {
            if(data.hasOwnProperty(key) && typeof data[key] !== 'function') {
                let escapedData = this.escapeStringForSQL(data[key]);

                columnString += key + ",";
                valuesString += "'" + escapedData + "',";
            }
        }

        // remove trailing commas
        columnString = columnString.substring(0, columnString.length - 1);
        valuesString = valuesString.substring(0, valuesString.length - 1);

        columnString += ")";
        valuesString += ")";

        queryString = queryString + columnString + " VALUES " + valuesString + ";";

        return this.query(queryString, (results) => {
            return results.affectedRows == 1 ? true : false;
        });
    }

    /**
     * Makes a string OWASP safe for entering into an SQL database.
     * 
     * @param {string} str the string to make safe for entry
     * 
     * @returns {string} the escaped string version of the input string
     */
    escapeStringForSQL(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
            }
        });
    }

}

module.exports = MysqlDriver;