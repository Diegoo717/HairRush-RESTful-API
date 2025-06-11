const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Appointment = sequelize.define('appointment',{

    fullName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,  
        allowNull: false
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    service:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Appointment