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

    find(id, collectionName) {
        const queryString = "SELECT * FROM `" + collectionName + "` WHERE id='" + id + "';";

        return this.query(queryString, (results) => {
            return results ? results[0] : null;
        });
    }

}

module.exports = MysqlDriver;