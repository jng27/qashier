const config = require('../config/config.js')

class CarparkService {
    constructor(sqlInterface) {
        this.sqlInterface = sqlInterface
    }

    ListCarpark(callback){
        this.sqlInterface.PerformQuery(`
        SELECT c.carparkId, c.name, cat.categoryId, cat.size, cat.min, cat.max
        FROM ${config.tables.CARPARK} AS c
        JOIN ${config.tables.CARPARKCATEGORY} as cc ON cc.carparkId = c.carparkId
        JOIN ${config.tables.CATEGORY} as cat ON cat.categoryId = cc.categoryId
        ORDER BY cc.sequence
        `, [],
        (records, error) => {
            callback(records, error)
        })
    }

}
module.exports = CarparkService;