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

    add(data, collectionName) {
        let queryString = "INSERT INTO `" + collectionName + "` ";
        let columnString = "(";
        let valuesString = "(";

        for (var key in data) {
            if(data.hasOwnProperty(key) && typeof data[key] !== 'function') {
                columnString += key + ",";
                valuesString += "'" + data[key] + "',";
            }
        }

        // remove trailing commas
        columnString = columnString.substring(0, columnString.length - 1);
        valuesString = valuesString.substring(0, valuesString.length - 1);

        columnString += ")";
        valuesString += ")";

        queryString = queryString + columnString + " VALUES " + valuesString + ";";

        console.log(queryString);

        return this.query(queryString, (results) => {
            console.log(results);
        });
    }

}

module.exports = MysqlDriver;