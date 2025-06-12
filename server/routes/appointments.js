const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointments");

router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(200).json({ message: "Appointment created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
