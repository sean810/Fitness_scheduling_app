import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBookings, deleteBooking } from "../API";

import "./UserDetails.css";

function UserDetails() {
  const { userId } = useParams(); // Get userId from URL
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating back to user list

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const data = await fetchUserBookings(userId); // Now already includes fitness class details
        setBookings(data);
      } catch (error) {
        setError("Error fetching bookings.");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookingsData();
  }, [userId]);

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await deleteBooking(bookingId);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      setError("Error deleting booking.");
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="user-detail-container">
      <h1 className="page-title">User Details</h1>

      {error && <p className="error-message">{error}</p>}

      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-details">
                {/* Check if fitness_class is available */}
                {booking.fitness_class ? (
                  <>
                    <h3 className="class-name">{booking.fitness_class.name}</h3>
                    <p>
                      Status:{" "}
                      <span className={`status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </p>
                    <p>
                      <strong>Session Time:</strong> {booking.fitness_class.time}
                    </p>
                  </>
                ) : (
                  <p className="error-message">Class details not available.</p>
                )}
                <button className="delete-btn" onClick={() => handleDeleteBooking(booking.id)}>
                  Delete Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found for this user.</p>
      )}

      <button className="back-btn" onClick={() => navigate("/users")}>
        Back to User List
      </button>
    </div>
  );
}

export default UserDetails;