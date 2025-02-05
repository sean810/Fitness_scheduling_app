import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchFitnessClasses } from "../API";
import './FitnessClass.css'; // Assuming the CSS is saved as FitnessClass.css

function FitnessClassList() {
  const [fitnessClasses, setFitnessClasses] = useState([]); // Initialize as empty array
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch fitness classes on component mount
    fetchFitnessClasses()
      .then((data) => {
        // Ensure the fetched data is an array
        setFitnessClasses(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        setError("Error fetching fitness classes.");
        console.error("Error fetching fitness classes:", error);
      });
  }, []);

  const handleBookClass = (fitnessClassId) => {
    // Redirect to the booking form, passing the class id as a parameter
    navigate(`/bookings/new?classId=${fitnessClassId}`);
  };

  return (
    <div className="fitness-class-container">
      <h1>✅ Available Fitness Classes</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message if fetch fails */}

      {fitnessClasses.length > 0 ? (
        fitnessClasses.map((fitnessClass) => (
          <div className="fitness-class-card" key={fitnessClass.id}>
            <img
              src={fitnessClass.image}
              alt={fitnessClass.name}
              className="fitness-class-image"
            />
            <div className="card-content">
              <h2>{fitnessClass.name}</h2>
              <p>{fitnessClass.description}</p>
              <p>Schedule: {new Date(fitnessClass.schedule).toLocaleString()}</p>
              <button onClick={() => handleBookClass(fitnessClass.id)}>
                Book Class
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No fitness classes available.</p> // Handle empty list
      )}
    </div>
  );
}

export default FitnessClassList;