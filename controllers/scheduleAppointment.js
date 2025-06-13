require('dotenv').config()
const db = require('../models/index')
const { resend } = require('../services/resend')
const Appointment = db.Appointment;

const scheduleAppointment = async (req,res) =>{

    try{

        const {fullName, email, date, time, service} = req.body

        if (!fullName || !email || !date || !time || !service) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if(!validateFullName(fullName)){
            return res.status(400).json({ error: "Invalid name" });
        }

        if(!validateEmail(email)){
            return res.status(400).json({ error: "Invalid email" });
        }

        if(!validateDate(date)){
            return res.status(400).json({ error: "Invalid date" });
        }

        if(!validateTime(time)){
            return res.status(400).json({ error: "Invalid time" });
        }

        if(!validateService(service)){
            return res.status(400).json({ error: "Invalid service" });
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

        resend(email, fullName, date, time, service, code)

        res.status(201).json({
            message: "Appointment crated succesfully",
            data: newAppointment
        })

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

// Validations

function validateFullName(fullName) {
    const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s-]+$/;
    
    return (
        fullName &&
        typeof fullName === "string" &&
        fullName.trim() !== "" &&
        fullName.replace(/\s/g, "").length >= 8 &&  
        regex.test(fullName)
    );
}

function validateEmail(email) {
    if (!email || typeof email !== "string") return false;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
}

function validateDate(date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;

    const [year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12 || day < 1 || day > 31) return false;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) return false;

    const inputDate = new Date(date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (inputDate < today) return false;

    if (inputDate.getDay() === 0) return false;

    return true;
}


function validateTime(time) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!regex.test(time)) {
        return false;
    }

    const [hours, minutes, seconds] = time.split(':').map(Number);

    if (seconds !== 0) {
        return false;
    }

    if (minutes !== 0 && minutes !== 30) {
        return false;
    }

    if (hours < 8 || hours > 20) {
        return false;
    }

    return true;
}

function validateService(service) {
    if (!service || typeof service !== "string") return false;
    
    const trimmedService = service.trim();
    const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;

    return (
        trimmedService !== "" &&            
        trimmedService.length >= 3 &&       
        trimmedService.length <= 25 &&      
        regex.test(service)                 
    );
}

module.exports = {scheduleAppointment}