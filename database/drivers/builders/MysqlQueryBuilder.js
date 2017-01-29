const MySqlDriver = require("./../MysqlDriver.js");
const MysqlQueryBuilderTypes = {
    NONE: -1,
    QUERY: 0,
    INSERT: 1,
    DELETE: 2,
    SELECT: 3
};

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
     * @param {Array} whereArray array of WHERE objects for a given where 
     * statement
     * 
     * @returns {MysqlQueryBuilder} instance of this object, to chain off of
     */
    where(whereArray) {
        this.data.where = whereArray;

        return this;
    }

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
            default:
                throw new Error("Unimplemented query builder action!");
        }
    }

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
            queryString += " WHERE ";

            for(let x = 0; x < this.data.where.length; x++) {
                let where = this.data.where[x];
                let safeString = this.escapeStringForSQL(where.value);

                queryString += where.columnName + "='" + safeString + "'";

                if(x != this.data.where.length - 1) {
                    queryString += " AND ";
                }
            }
        }

        queryString += ";";

        console.log(queryString);

        return this.driver.query(queryString, callback);
    }

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
            return results.affectedRows == 1 ? true : false;
        });
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