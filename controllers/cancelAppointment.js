require('dotenv').config
const db = require('../models/index')
const Appointment = db.Appointment

const cancelAppointment = async(req, res) =>{

    try{
        const {code} = req.body
        console.log

        const appointment = await Appointment.findOne({
            where:{
                code: code
            }
        }) 

        if(!appointment){
            res.status(404).json("Invalid code")
        }

        appointment.status = "canceled"
        await appointment.save()
        res.status(200).json("Appointment canceled succesfully")

    }catch(error){
        console.log(error)
        res.status(500).json("Problems to cancel appointment")
    }

}

module.exports = {cancelAppointment}