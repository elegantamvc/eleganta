const Driver = require("./drivers/MysqlDriver.js");

class Table {

    constructor(name) {
        this.tableName = name;
        this.driver = new Driver();
    }

    query(queryString) {
        return this.driver.query(queryString);
    }

    find(id) {
        return this.driver.find(id, this.tableName);
    }

    insert(data) {
        return this.driver.add(data, this.tableName);
    }

    remove(id) {
        return this.driver.remove(id, this.tableName);
    }

}

module.exports = Table;