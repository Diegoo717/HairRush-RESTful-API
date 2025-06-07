require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

testConnection();

app.get('/', (req, res) => {
  res.json({ 
    message: 'HairRush API 🚀',
    status: 'Operativa'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;