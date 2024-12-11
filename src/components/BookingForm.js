import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAvailableSlots, submitBooking } from "../api/apiService";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: new Date(),
    service: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  // Hardcoded timing slots for demo purposes
  const timingSlots = [
    { id: 1, time: "10:00 - 12:00" },
    { id: 2, time: "1:00 - 4:00" }
  ];

  useEffect(() => {
    // Example: Fetching slots from backend could be placed here.
    // const loadSlots = async () => {
    //   const slots = await fetchAvailableSlots();
    //   setAvailableSlots(slots);
    // };
    // loadSlots();

    // For demo, use hardcoded slots
    setAvailableSlots(timingSlots);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitBooking(formData);
    if (response.success) {
      setNotification({ message: response.message, type: "success" });
      setFormData({ name: "", contact: "", date: new Date(), service: "" });
      navigate("/payment");
    } else {
      setNotification({ message: "Booking failed!", type: "error" });
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <label>Contact:</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
        <label>Date:</label>
        <DatePicker
          selected={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
          required
        />
        <label>Available Slots:</label>
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
        >
          <option value="">Select a time</option>
          {availableSlots.map((slot) => (
            <option key={slot.id} value={slot.time}>
              {slot.time}
            </option>
          ))}
        </select>
        <button type="submit">Confirm Booking</button>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default BookingForm;
