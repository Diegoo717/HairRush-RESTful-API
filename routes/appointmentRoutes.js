const express = require("express");
const router = express.Router();
const { scheduleAppointment } = require("../controllers/scheduleAppointment")
const { getAppointments } = require("../controllers/getAppointments")
const { cancelAppointment } = require("../controllers/cancelAppointment")

router.post("/scheduleAppointment", scheduleAppointment)
router.get("/getAppointments", getAppointments)
router.put("/cancelAppointment", cancelAppointment)

module.exports = router