const MySqlDriver = require("./../MysqlDriver.js");
const MysqlQueryBuilderTypes = {
    NONE: -1,
    QUERY: 0,
    INSERT: 1,
    DELETE: 2,
    SELECT: 3
};

class MysqlQueryBuilder {

    constructor(tableName) {
        this.driver = new MySqlDriver();
        this.type = MysqlQueryBuilderTypes.NONE;
        this.suffixes = {};
        this.data = {};
        this.tableName = tableName;
    }

    /**
     * Sets the type of this query. 
     * 
     * @param {string} typeName the name of the type; options are "NONE",
     * "QUERY", "INSERT", "SELECT", or "DELETE"
     */
    setType(typeName) {
        this.type = MysqlQueryBuilderTypes[typeName.toUpperCase()];
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

    /**
     * Builds the final query, executes it, and returns the results.
     * 
     * @returns {Promise} resolves to the results of the query
     */
    get(callback) {
        switch(this.type) {
            case MysqlQueryBuilderTypes.SELECT:
                return this.buildSelectQuery(callback);
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

                queryString += where.columnName + "='" + where.value + "'";

                if(x != this.data.where.length - 1) {
                    queryString += " AND ";
                }
            }
        }

        queryString += ";";

        console.log(queryString);

        return this.driver.query(queryString, callback);
    }

}

module.exports = MysqlQueryBuilder;