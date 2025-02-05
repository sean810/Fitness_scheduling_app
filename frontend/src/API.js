const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// Generic API request handler
const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const headers = { "Content-Type": "application/json" };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage || response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.includes("application/json") ? await response.json() : null;
  } catch (error) {
    console.error(`API Error at ${endpoint}:`, error.message);
    throw error;
  }
};

// Users API
export const fetchUsers = () => apiRequest("/users");

export const deleteUser = (userId) => apiRequest(`/users/${userId}`, "DELETE");

export const createUser = (userData) => apiRequest("/users", "POST", userData);

export const fetchUser = (userId) => apiRequest(`/users/${userId}`);

export const updateUser = (userId, userData) => apiRequest(`/users/${userId}`, "PUT", userData);

// Bookings API
export const createBooking = (bookingData) => apiRequest("/bookings", "POST", bookingData);

export const fetchBookings = () => apiRequest("/bookings");

export const deleteBooking = (bookingId) => apiRequest(`/bookings/${bookingId}`, "DELETE");

// Fitness Classes API
export const createClass = (classData) => apiRequest("/classes", "POST", classData);

export const fetchFitnessClasses = () => apiRequest("/classes");

export const fetchFitnessClass = (classId) => apiRequest(`/classes/${classId}`);

// User Bookings API (Fetching bookings with fitness class details)
export const fetchUserBookings = async (userId) => {
  try {
    const bookings = await apiRequest(`/bookings?user_id=${userId}`);

    // Ensure bookings exist before mapping
    if (!Array.isArray(bookings) || bookings.length === 0) return [];

    const bookingsWithClassDetails = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const fitnessClass = await fetchFitnessClass(booking.fitness_class_id);
          return { ...booking, fitness_class: fitnessClass || null };
        } catch (classError) {
          console.warn(`Failed to fetch fitness class for booking ID ${booking.id}:`, classError.message);
          return { ...booking, fitness_class: null };
        }
      })
    );

    return bookingsWithClassDetails;
  } catch (error) {
    console.error("Error fetching user bookings with class details:", error);
    throw error;
  }
};