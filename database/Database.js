const Table = require("./Table.js");
const DriverAliases = require("./drivers/DriverAliases.js");

class Database {

    static retrieveDriver() {
        let driverType = env("database.driver");
        
        if(DriverAliases[driverType]) {
            let driverPath = DriverAliases[driverType];

            return require("./drivers/" + driverPath);
        } else {
            return require("./drivers/MysqlDriver.js");
        }
    }

    static table(name) {
        let driver = this.retrieveDriver();

        return new Table(name, driver);
    }

}

module.exports = Database;