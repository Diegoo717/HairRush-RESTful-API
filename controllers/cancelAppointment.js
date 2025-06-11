require('dotenv').config
const db = require('../models/index')
const Appointment = db.Appointment

const cancelAppointment = async(req, res) =>{

    try{
        const {code} = req.body
        
        if(!isValidCode(code)){
            return res.status(404).json("Invalid code")
        }

        const appointment = await Appointment.findOne({
            where:{
                code: code
            }
        }) 

        if(!appointment){
            return res.status(404).json("Code not found")
        }

        appointment.status = "canceled"
        await appointment.save()
        res.status(200).json("Appointment canceled succesfully")

    }catch(error){
        console.log(error)
        res.status(500).json("Problems to cancel appointment")
    }

}

function isValidCode(code) {
  const validChars = /^[A-Za-z0-9]{9}$/;
  return validChars.test(code);
}

module.exports = {cancelAppointment}