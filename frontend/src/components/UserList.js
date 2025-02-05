import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers, fetchUserBookings, deleteBooking } from "../API"; // Corrected import
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]); // Default to empty array
  const [selectedUserId, setSelectedUserId] = useState(null); // For handling selected user
  const [userBookings, setUserBookings] = useState([]); // To store bookings of selected user
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors if any

  useEffect(() => {
    // Fetch users on component mount
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError("Error fetching users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (userId) => {
    // Confirmation before deleting
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId)
        .then(() => {
          setUsers(users.filter((user) => user.id !== userId)); // Remove deleted user from state
        })
        .catch((err) => {
          setError("Error deleting user.");
          console.error("Error deleting user:", err);
        });
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId); // Set selected user
    fetchUserBookings(userId) // Fetch bookings for the selected user
      .then((data) => setUserBookings(data)) // Update bookings state
      .catch((err) => {
        setError("Error fetching user bookings.");
        console.error("Error fetching user bookings:", err);
      });
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(bookingId)
        .then(() => {
          // Remove deleted booking from bookings list
          setUserBookings(userBookings.filter((booking) => booking.id !== bookingId));
        })
        .catch((err) => {
          setError("Error deleting booking.");
          console.error("Error deleting booking:", err);
        });
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <Link to="/users/new" className="create-user-link">Create New User</Link>

      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <ul className="user-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <Link
                to={`/users/${user.id}`}
                onClick={() => handleSelectUser(user.id)}
                className="user-link"
              >
                {user.name}
              </Link>{" "}
              <span className="user-email">({user.email})</span>
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>

      {/* Display bookings for selected user */}
      {selectedUserId && (
        <div className="user-bookings">
          <h2>Bookings for {users.find(user => user.id === selectedUserId)?.name}</h2>
          <ul className="booking-list">
            {userBookings.length > 0 ? (
              userBookings.map((booking) => (
                <li key={booking.id} className="booking-item">
                  {booking.className}{" "}
                  <button
                    className="delete-booking-button"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li>No bookings found for this user.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserList;