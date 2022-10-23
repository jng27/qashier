const sql = require('mysql')
const config = require('../config/config.js')
"use strict";
class SqlInterface {
    constructor () {
        //Use this config if youre able to read .env on your end
        // this.config = { 
        //     connectionLimit : 10,
        //     host: config.sqlServer,
        //     database: config.sqlDb,
        //     port : config.sqlPort,
        //     user : config.sqlUser,
        //     password : '',
        // };
        //Use this config if you have issues reading env variables
        this.config = {
            connectionLimit : 10,
            host: "localhost",
            database: "qashier",
            port : 3306,
            user : "root",
            password : '',
        };
        this.pool = undefined;
    }
    async ConnectDB(retryCount = 0) {
        if (this.pool == undefined) {
            return await new Promise((res,rej) => {
                let pool = sql.createPool(this.config);
                pool.getConnection(async (err,_) => {
                    if (err == null) {
                        this.pool = pool
                        res(this.pool)
                    } else {
                        if (err.code == "ER_ACCESS_DENIED_ERROR" && retryCount < 5) {
                            let retry = retryCount + 1
                            await this.ConnectDB(retry)
                            res(this.pool)
                        } else {
                            console.log(err)
                            rej("connection error")
                        }
                    }
                })
            })
        } else {
            return this.pool
        }
    }

    // inputs is an array
    // [value]
    // Connect to DB only during Query
    async PerformQuery(queryString, inputs, callback) {
        var options = {
            sql: queryString,
            values: inputs
        };
        try {
            await this.ConnectDB();
            this.pool.query(options, inputs, (err, results, fields) => {
                if (callback == null) {
                    return;
                }
                callback(err == null ? results : null,err)
            });
        } catch (err) {
            console.log(err)
            callback(null,err)
        }
    }
}
var interface = new SqlInterface()
module.exports = interface;