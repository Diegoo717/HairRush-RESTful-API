require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/database')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
  res.json({Tittle: "API en funcionamientooooooo :)"})
})

const PORT = process.env.PORT || 2000;

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`))