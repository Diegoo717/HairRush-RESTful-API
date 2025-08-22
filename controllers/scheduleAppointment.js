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

        const nameValidation = validateFullName(fullName);
        if(nameValidation){
            return res.status(400).json({ error: nameValidation });
        }

        const emailValidation = validateEmail(email);
        if(emailValidation){
            return res.status(400).json({ error: emailValidation });
        }

        const dateValidation = validateDate(date);
        if(dateValidation){
            return res.status(400).json({ error: dateValidation });
        }

        const timeValidation = validateTime(time);
        if(timeValidation){
            return res.status(400).json({ error: timeValidation });
        }

        const serviceValidation = validateService(service);
        if(serviceValidation){
            return res.status(400).json({ error: serviceValidation });
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
            message: "Appointment created successfully",
            data: newAppointment
        })

        function extractCharact(email){
            const characters = email.substring(0,3)
            return characters
        }

    }catch(error){
        console.error("Error to schedule appointment: ", error);
        res.status(500).json({ error: "Server error" });
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
    if (!fullName) {
        return "Full name is required";
    }

    if (typeof fullName !== "string") {
        return "Name must be valid text";
    }

    if (fullName.trim() === "") {
        return "Name cannot be empty";
    }

    if (fullName.replace(/\s/g, "").length < 8) {
        return "Name must contain at least 8 characters";
    }

    const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s-]+$/;
    if (!regex.test(fullName)) {
        return "Only letters, spaces and hyphens are allowed";
    }

    return null;
}

function validateEmail(email) {
    if (!email) {
        return "Email is required";
    }

    if (typeof email !== "string") {
        return "Email must be valid text";
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email.trim())) {
        return "Enter a valid email address";
    }

    return null;
}

function validateDate(date) {
    if (!date) {
        return "Date is required";
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        return "Date must have YYYY-MM-DD format";
    }

    const [year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12) {
        return "Month must be between 01 and 12";
    }

    if (day < 1 || day > 31) {
        return "Day must be between 01 and 31";
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
        return "Day is not valid for the selected month";
    }

    const inputDate = new Date(date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (inputDate < tomorrow) {
        return "Date must be at least 1 day in advance from today";
    }

    if (inputDate.getDay() === 0 || inputDate.getDay() === 6) {
        return "Appointments can only be scheduled Monday to Friday";
    }

    return null;
}

function validateTime(time) {
    if (!time) {
        return "Time is required";
    }

    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!regex.test(time)) {
        return "Time must have HH:MM:SS format";
    }

    const [hours, minutes, seconds] = time.split(':').map(Number);

    if (seconds !== 0) {
        return "Seconds must be 00";
    }

    if (minutes !== 0 && minutes !== 30) {
        return "Minutes must be 00 or 30";
    }

    if (hours < 8 || hours > 20 || (hours > 14 && hours < 16)) {
        return "Service hours are 08:00 to 14:00 and 16:00 to 20:00";
    }

    return null;
}

function validateService(service) {
    if (!service) {
        return "You must select a service";
    }

    if (typeof service !== "string") {
        return "Service must be valid text";
    }

    const trimmedService = service.trim();

    if (trimmedService === "") {
        return "You must select a valid service";
    }

    if (trimmedService.length < 3) {
        return "Service must have at least 3 characters";
    }

    if (trimmedService.length > 40) {
        return "Service cannot have more than 40 characters";
    }

    const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    if (!regex.test(service)) {
        return "Service can only contain letters and spaces";
    }

    return null;
}

module.exports = {scheduleAppointment}