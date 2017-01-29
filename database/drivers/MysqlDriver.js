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

}

module.exports = MysqlDriver;