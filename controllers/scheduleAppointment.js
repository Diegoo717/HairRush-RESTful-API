require('dotenv').config()
const db = require('../models/index')
const Appointment = db.Appointment;
const { Resend } = require('resend');

const scheduleAppointment = async (req,res) =>{

    try{

        const {fullName, email, date, time, service} = req.body

        if (!fullName || !email || !date || !time || !service) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const appointmentExist = await Appointment.findOne({ 
            where: { 
                date: date,
                time: time,
                status: "scheduled"
            } 
        });

        if (appointmentExist) {
            return res.status(409).json({ 
                error: "Appointment scheduled already exists" 
            });
        }

        const code = createRandomString(3) + extractCharact(email) + createRandomString(3)

        const newAppointment = await Appointment.create({ 
            fullName, 
            email, 
            date,
            time,
            status: "scheduled",
            service, 
            code: code
        });

        res.status(201).json({
            message: "Appointment crated succesfully",
            data: newAppointment
        })

        /*
        const resend = new Resend(process.env.API_KEY_RESEND);

        (async function () {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Hello World baby ;)',
            html: '<strong>It works!</strong>',
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });
        })();
        */

        function extractCharact(email){
            const characters = email.substring(0,3)
            return characters
        }

    }catch(error){
        console.error("Error to schedule appointment: ", error);
        res.status(500).json({ error: "Error in the server" });
    }

}

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}



module.exports = {scheduleAppointment}