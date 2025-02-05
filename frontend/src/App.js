import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";  // Assuming this is your navbar component
import UserList from "./components/UserList";  // Component to display list of users
import ClassList from "./components/FitnessClassList";  // Component to display list of fitness classes
import BookingList from "./components/BookingList";  // Component to display list of bookings
import ClassForm from "./components/ClassForm";  // Component to add a new class
import BookingForm from "./components/BookingForm";  // Component to add a new booking
import UserForm from "./components/UserForm";  // Component to add a new user
import UserDetails from "./components/UserDetails"; // Component to show details of a selected user (e.g., bookings)

function App() {
  return (
    <Router>
      <Navbar /> {/* This is your navigation bar */}
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />  {/* Home route for users */}
        <Route path="/users/new" element={<UserForm />} />  {/* Form to create a new user */}
        <Route path="/users/:userId" element={<UserDetails />} />  {/* Show details of a selected user */}

        {/* Fitness class routes */}
        <Route path="/classes" element={<ClassList />} />  {/* List of all fitness classes */}
        <Route path="/classes/new" element={<ClassForm />} />  {/* Form to create a new fitness class */}

        {/* Booking routes */}
        <Route path="/bookings" element={<BookingList />} />  {/* List of all bookings */}
        <Route path="/bookings/new" element={<BookingForm />} />  {/* Form to create a new booking */}
      </Routes>
    </Router>
  );
}

export default App;