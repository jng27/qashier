require('dotenv').config()
module.exports = {
    sqlServer: process.env.sql_server,
    sqlDb: process.env.sql_db,
    sqlPort: 3306,
    sqlUser: process.env.sql_user,
    secretKey : process.env.secret_key,
    tables: {
        CARPARK: 'carpark',
        CATEGORY : 'category',
        CARPARKCATEGORY : 'carpark_category'
    },
};