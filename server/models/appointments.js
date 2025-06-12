const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientNumber: { type: String, required: true },
  patientGender: { type: String, required: true },
  appointmentTime: { type: Date, required: true },
  preferredMode: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
