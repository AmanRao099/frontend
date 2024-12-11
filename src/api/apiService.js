import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",  // Backend URL
});

// Fetch available slots (optional for future implementation)
export const fetchAvailableSlots = async () => {
  try {
    const response = await api.get("/slots");
    return response.data;
  } catch (error) {
    console.error("Error fetching slots", error);
    return [];
  }
};

// Submit booking to backend
export const submitBooking = async (formData) => {
  try {
    const response = await api.post("/bookings", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting booking", error);
    return { success: false, message: "Booking failed!" };
  }
};
