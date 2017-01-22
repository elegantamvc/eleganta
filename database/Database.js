const Table = require("./Table.js");

class Database {

    static table(name) {
        return new Table(name);
    }

}

module.exports = Database;