require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection successful (Supabase)');
  } catch (error) {
    console.error('❌ Error connection to PostgreSQL:', error.message);
  }
})();

module.exports = sequelize;