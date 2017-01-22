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

    query(queryString) {
        return new Promise((resolve) => {
            this.connection.connect();

            this.connection.query(queryString, (error, results, fields) => {
                if(error) throw error;

                resolve(results);
            });

            this.connection.end();
        });
    }

}

module.exports = MysqlDriver;