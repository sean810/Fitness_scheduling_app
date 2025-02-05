import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBookings, deleteBooking } from "../API";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users, classes, and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, classesResponse, bookingsResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/classes"),
          fetchBookings("http://localhost:3000/bookings")
        ]);
        
        const usersData = await usersResponse.json();
        const classesData = await classesResponse.json();
        const bookingsData = await bookingsResponse.json();
        
        setUsers(usersData);
        setClasses(classesData);
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle booking deletion
  const handleDelete = (bookingId) => {
    deleteBooking(bookingId)
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking List</h1>
      <Link to="/bookings/new">Create New Booking</Link>
      <ul>
        {bookings.map((booking) => {
          const user = users.find((user) => user.id === booking.user_id);
          const fitnessClass = classes.find((cls) => cls.id === booking.fitness_class_id);

          return (
            <li key={booking.id}>
              <div>
                <p>
                  Booking: {fitnessClass ? fitnessClass.name : "N/A"} (User:{" "}
                  {user ? user.name : "Unknown"}) - Status: {booking.status}
                </p>
                <button onClick={() => handleDelete(booking.id)}>Delete</button>{" "}
                <Link to={`/bookings/${booking.id}/edit`}>Edit</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookingList;