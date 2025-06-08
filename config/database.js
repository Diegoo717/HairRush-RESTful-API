require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER,  
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, 
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: false, 
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection succesfull');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log(`🌐 Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`);
  } catch (error) {
    console.error('❌ Error connection to PostgreSQL:', error.message);
  }
})();

module.exports = sequelize;