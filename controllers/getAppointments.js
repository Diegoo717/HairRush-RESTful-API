require('dotenv').config()
const db = require('../models/index')
const Appointment = db.Appointment;

const getAppointments = async(req,res) => {

    try{
        const appointments = await Appointment.findAll({
            where:{
                status: "scheduled"
            }
        })

        const dates = appointments.map(appointment => ({
            date: appointment.date,
            time: appointment.time
        }))

        res.status(200).json(dates)

    }catch(error){
        console.log("Error to get appointments")
        res.status(500).json({error: "Error to get appointments"})
    }

}

module.exports = { getAppointments }