const Table = require("./Table.js");
const DriverAliases = require("./drivers/DriverAliases.js");

class Database {

    /**
     * Retrieves the database driver based on what the user has set in their 
     * environment JSON file. If the driver cannot be found, will default to 
     * the MySQL driver.
     * 
     * @returns {Driver} the database driver required to actually access the 
     * database.
     */
    static retrieveDriver() {
        let driverType = env("database.driver");
        
        if(DriverAliases[driverType]) {
            let driverPath = DriverAliases[driverType];

            return require("./drivers/" + driverPath);
        } else {
            return require("./drivers/MysqlDriver.js");
        }
    }

    /**
     * Builds and returns a Table object that's used to access a specific table 
     * or collection.
     * 
     * @param {string} name the name of the table to bind on
     * 
     * @returns {Table} the table object to use to make queries against the
     * table
     */
    static table(name) {
        let driver = this.retrieveDriver();

        return new Table(name, driver);
    }

}

module.exports = Database;