const express = require("express");
const router = express.Router();
const {scheduleAppointment} = require("../controllers/scheduleAppointment")

router.post("/scheduleAppoint", scheduleAppointment)

module.exports = router