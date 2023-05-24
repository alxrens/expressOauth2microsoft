const { DataTypes } = require('sequelize');
const sq = require('./../../config/sq')

const userdata = sq.define('usersData',{
    id : {
        type : DataTypes.STRING,
        primaryKey : true,
        allowNull : false,
    },
    firstname : { 
        type : DataTypes.STRING,
        allowNull : false
        
    },
    lastname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
    },
    phonenumber : {
        type : DataTypes.STRING,
        allowNull : false
    },
    purpose : {
        type : DataTypes.STRING,
        allowNull : false
    },
    message : {
        type : DataTypes.TEXT,
        allowNull : false
    }

},{
    paranoid : true
});

module.exports = userdata