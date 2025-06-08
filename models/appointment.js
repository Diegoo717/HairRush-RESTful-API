const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Appointment = sequelize.define('appoinment',{

    fullName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING(15),  
        allowNull: false,
        validate: {
        len: [7, 15], 
        is: /^\+?\d[\d\s()-]{6,14}\d$/,
        notEmpty: true 
        }
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time:{
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
        is: /^([01]?\d|2[0-3]):[0-5]\d$/ 
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Appointment