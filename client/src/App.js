import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  patientName: z.string().min(8, "Name must be at least 8 characters"),
  patientNumber: z.string().length(10, "Phone number must be 10 digits"),
  patientGender: z.enum(["male", "female", "private"]),
  appointmentTime: z.string().refine(val => new Date(val) > new Date(), {
    message: "Appointment time must be in the future"
  }),
  preferredMode: z.enum(["voice", "video"]),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/appointments", data);
      toast.success("Appointment scheduled!");
      reset();
    } catch (err) {
      toast.error("Failed to schedule appointment");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("patientName")} placeholder="Full Name" />
        <p>{errors.patientName?.message}</p>

        <input {...register("patientNumber")} placeholder="Phone Number" />
        <p>{errors.patientNumber?.message}</p>

        <select {...register("patientGender")}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="private">Private</option>
        </select>
        <p>{errors.patientGender?.message}</p>

        <input {...register("appointmentTime")} type="datetime-local" />
        <p>{errors.appointmentTime?.message}</p>

        <select {...register("preferredMode")}>
          <option value="">Preferred Mode</option>
          <option value="voice">Voice</option>
          <option value="video">Video</option>
        </select>
        <p>{errors.preferredMode?.message}</p>

        <button type="submit">Submit</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default App;
