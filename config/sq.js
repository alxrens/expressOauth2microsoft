const { Sequelize } = require("sequelize");
require('dotenv').config();

const sq = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS, {
    logging : false,
    host :process.env.DB_HOST,
    dialect :process.env.DB_DIALECT,
    port : process.env.DB_PORT,
    pool : {
        max : 300,
        min : 0,
        idle : 200000,
        acquire : 1000000
    },
    timezone : '+07:00'
},)

module.exports = sq