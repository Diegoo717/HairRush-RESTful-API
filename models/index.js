const sequelize = require('../config/database');
const Appointment = require('./Appointment');

const db = {
  sequelize,
  Appointment
};

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conected');

    await sequelize.sync({ 
      alter: true, 
      force: false  
    });
    
    console.log('🔄 Models Synchronized');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

syncDatabase();

module.exports = db;