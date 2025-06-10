require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/database')
const {sequelize} = require('./models')
const appointmentRoutes = require('./routes/appointmentRoutes')

const app = express()
sequelize.sync({ alter: true })

app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
  res.json({Tittle: "API ready :)"})
})

app.use('/api', appointmentRoutes)

const PORT = process.env.PORT || 2000;

app.listen(PORT, ()=> console.log(`Server run in http://localhost:${PORT}`))

