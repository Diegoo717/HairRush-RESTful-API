require('dotenv').config()
const db = require('../models/index')
const Appointment = db.Appointment;
const { Resend } = require('resend');

const scheduleAppointment = async (req,res) =>{

    try{

        const {fullName, email, date, time, status, service} = req.body

        if (!fullName || !email || !date || !time || !status || !service) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const appointmentExist = await Appointment.findOne({ 
            where: { 
                date: date,
                time: time
            } 
        });

        if (appointmentExist) {
            return res.status(409).json({ 
                error: "Appointment already exists" 
            });
        }

        const newAppointment = await Appointment.create({ 
            fullName, 
            email, 
            date,
            time,
            status,
            service
        });

        res.status(201).json({
            message: "Appointment crated succesfully",
            data: newAppointment
        })

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

    }catch(error){
        console.error("Error to schedule appointment: ", error);
        res.status(500).json({ error: "Error in the server" });
    }

}

module.exports = {scheduleAppointment}