const Driver = require("./drivers/MysqlDriver.js");

class Table {

    constructor(name) {
        this.tableName = name;
        this.driver = new Driver();
    }

    query(queryString) {
        return this.driver.query();
    }

}

module.exports = Table;