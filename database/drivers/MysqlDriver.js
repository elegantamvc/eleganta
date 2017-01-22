const Driver = require("./Driver.js");
const ConfigHelper = require("./../../helpers/config/config.js");
const mysql = require('mysql');

class MysqlDriver extends Driver {

    constructor() {
        super();

        let configHelper = new ConfigHelper(process.cwd());

        this.settings = configHelper.getSettingsFiles("database");

        this.connection = mysql.createConnection({
            host: this.settings.host,
            user: this.settings.username,
            password: this.settings.password,
            database: this.settings.database
        });
        this.connection.connect();
    }

    query(queryString) {
        this.connection.query(queryString, function(error, results, fields) {
            if(error) throw error;

            console.log(results);

            return results;
        });
    }

}

module.exports = MysqlDriver;