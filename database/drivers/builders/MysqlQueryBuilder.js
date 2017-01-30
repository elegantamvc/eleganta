const MySqlDriver = require("./../MysqlDriver.js");
const MysqlQueryBuilderTypes = {
    NONE: -1,
    QUERY: 0,
    INSERT: 1,
    DELETE: 2,
    SELECT: 3
};

/**
 * Object that represents a strung together query; can be used to build SQL
 * queries safely and programmatically.
 */
class MysqlQueryBuilder {

    /**
     * Makes a new instance of a MysqlQueryBuilder for a specified table.
     * 
     * @param {string} tableName the name of the table to bind to
     * 
     * @param {string=} typeName the type of the query to build; options are 
     * the same as the setType method
     */
    constructor(tableName, typeName = null) {
        this.driver = new MySqlDriver();
        this.type = MysqlQueryBuilderTypes.NONE;
        this.suffixes = {};
        this.data = {};
        this.tableName = tableName;

        if(typeName) {
            this.setType(typeName);
        }
    }

    /**
     * Sets the type of this query. 
     * 
     * @param {string} typeName the name of the type; options are "NONE",
     * "QUERY", "INSERT", "SELECT", or "DELETE"
     */
    setType(typeName) {
        const transformedType = typeName.toUpperCase();

        if(!MysqlQueryBuilderTypes[transformedType]) {
            throw new Error("Invalid type name '" + typeName + "'!");
        }

        this.type = MysqlQueryBuilderTypes[transformedType];
    }

    /**
     * Sets the ordering of a this query.
     * 
     * @param {string} columnName the column to order by
     * 
     * @param {sorting=} sorting the sorting type of the order; options are 
     * "ASC" or "DESC"
     * 
     * @returns {MysqlQueryBuilder} instance of this object, to chain off of
     */
    orderBy(columnName, sorting = "ASC") {
        this.suffixes.orderBy = "ORDER BY `" + columnName + "` " + sorting;

        return this;
    }

    /**
     * Sets the WHERE limitation for a given query.
     * 
     * @param {Array|string} arrayOrName array of WHERE objects for a given
     * where statement, or the column name for a single where statement
     * 
     * @param {string} operatorOrValue the operator if you intend to specify 
     * one for the where statement, or the value for the statement otherwise
     * 
     * @param {string} value if you specified a value for the previous
     * parameter, this is the value to specify
     * 
     * @returns {MysqlQueryBuilder} instance of this object, to chain off of
     */
    where(arrayOrName, operatorOrValue = null, value = null) {
        if(!this.data.where) {
            this.data.where = [];
        }

        if(arguments.length == 3) {
            this.data.where.push([
                arrayOrName, operatorOrValue, value
            ]);
        } else if(arguments.length == 2) {
            this.data.where.push([
                arrayOrName, "=", operatorOrValue
            ]);
        } else if(arguments.length == 1) {
            for(let x = 0; x < arrayOrName.length; x++) {
                let whereEntry = arrayOrName[x];

                if(whereEntry.length == 3) {
                    this.data.where.push(whereEntry);
                } else if(whereEntry.length == 2) {
                    this.data.where.push([
                        whereEntry[0], "=", whereEntry[1]
                    ]);
                } else {
                    throw new Error("Bad length for where entry.");
                }
            }
        } else {
            throw new Error("Bad number of arguments for where call.");
        }

        return this;
    }

    /**
     * Sets the insert data for a INSERT type query.
     * 
     * @param {Array} data map of "column": "value" data points to build the 
     * new entry
     */
    setInsertData(data) {
        this.data.insert = data;
    }

    /**
     * Builds the final query, executes it, and returns the results.
     * 
     * @returns {Promise} resolves to the results of the query
     */
    get(callback) {
        switch(this.type) {
            case MysqlQueryBuilderTypes.SELECT:
                return this.buildSelectQuery(callback);
            case MysqlQueryBuilderTypes.INSERT:
                return this.buildInsertQuery(callback);
            case MysqlQueryBuilderTypes.DELETE:
                return this.buildDeleteQuery(callback);
            default:
                throw new Error("Unimplemented query builder action!");
        }
    }

    /**
     * Builds a SELECT query string and executes it, returning a Promise for 
     * when it is complete.
     * 
     * @param {function} callback callback function to be called after the 
     * query comes back from the server (successfully), but before the data 
     * is passed off to the Promise for resolution. Will pass the raw data from 
     * the SQL server to be parsed or transformed in any way.
     * 
     * @return {Promise} Promise that is resolved when the SELECT query
     * completes with the data of the SELECT
     */
    buildSelectQuery(callback) {
        let queryString = "SELECT ";

        if(this.data.columns) {
            for(let x = 0; x < this.data.columns.length; x++) {
                queryString += this.data.columns[x];

                if(x != this.data.columns.length - 1) {
                    queryString += ",";
                }
            }
        } else {
            queryString += " *";
        }

        queryString += " FROM `" + this.tableName + "`";

        if(this.data.where) {
            queryString += this.buildWhereString();
        }

        queryString += ";";

        console.log(queryString);

        return this.driver.query(queryString, callback);
    }

    /**
     * Builds an INSERT query string and executes it, returning a Promise for 
     * when it is complete.
     * 
     * @param {function} callback callback function to be called after the 
     * query comes back from the server (successfully), but before the data 
     * is passed off to the Promise for resolution. Will pass the raw data from 
     * the SQL server to be parsed or transformed in any way.
     * 
     * @return {Promise} Promise that is resolved when the INSERT query
     * completes with the data of the INSERT
     */
    buildInsertQuery(callback) {
        let queryString = "INSERT INTO `" + this.tableName + "` ";
        let columnString = "(";
        let valuesString = "(";

        for (var key in this.data.insert) {
            if(this.data.insert.hasOwnProperty(key) && typeof this.data.insert[key] !== 'function') {
                let escapedData = this.escapeStringForSQL(this.data.insert[key]);

                columnString += key + ",";
                valuesString += "'" + escapedData + "',";
            }
        }

        // remove trailing commas
        columnString = columnString.substring(0, columnString.length - 1);
        valuesString = valuesString.substring(0, valuesString.length - 1);

        columnString += ")";
        valuesString += ")";

        queryString = queryString + columnString + " VALUES " + valuesString + ";";

        return this.driver.query(queryString, (results) => {
            if(callback) {
                return callback(results);
            } else {
                return results.affectedRows == 1 ? true : false;
            }
        });
    }

    /**
     * Builds a DELETE query string and executes it, returning a Promise for 
     * when it is complete.
     * 
     * @param {function} callback callback function to be called after the 
     * query comes back from the server (successfully), but before the data 
     * is passed off to the Promise for resolution. Will pass the raw data from 
     * the SQL server to be parsed or transformed in any way.
     * 
     * @return {Promise} Promise that is resolved when the DELETE query
     * completes with the data of the DELETE
     */
    buildDeleteQuery(callback) {
        let queryString = "DELETE FROM `" + this.tableName + "`";

        if(this.data.where) {
            queryString += this.buildWhereString();
        }

        queryString += ";";

        return this.driver.query(queryString, callback);
    }

    /**
     * Builds an SQL partial for a WHERE clause given the current set where
     * data.
     * 
     * @returns {string} the complete WHERE partial string
     */
    buildWhereString() {
        let x, queryPartial = " WHERE ";

        for(x = 0; x < this.data.where.length; x++) {
            let where = this.data.where[x];
            let columnName = where[0];
            let operator = where[1];
            let safeValue = this.escapeStringForSQL(where[2]);

            queryPartial += columnName + operator + "'" + safeValue + "'";

            if(x != this.data.where.length - 1) {
                queryPartial += " AND ";
            }
        }

        return queryPartial;
    }

    /**
     * Makes a string OWASP safe for entering into an SQL database.
     * 
     * @param {string} str the string to make safe for entry
     * 
     * @returns {string} the escaped string version of the input string
     */
    escapeStringForSQL(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
            }
        });
    }

}

module.exports = MysqlQueryBuilder;