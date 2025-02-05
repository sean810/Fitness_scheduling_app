import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createBooking } from "../API"; 

// Validation schema
const validationSchema = Yup.object({
  user_id: Yup.number().required("User selection is required"),
  fitness_class_id: Yup.number().required("Class selection is required"),
  status: Yup.string().required("Status selection is required"),
});

function BookingForm() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, classesResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/classes"),
        ]);

        const usersData = await usersResponse.json();
        const classesData = await classesResponse.json();

        setUsers(usersData);
        setClasses(classesData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    createBooking(values)
      .then((data) => {
        console.log("Booking Created:", data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };

  if (loading) {
    return <div>Loading users and classes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="form-container">
      <h2>Create Booking</h2>
      <Formik
        initialValues={{ user_id: "", fitness_class_id: "", status: "confirmed" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="booking-form">
            <div className="form-group">
              <label htmlFor="user_id">Select User</label>
              <Field as="select" name="user_id" id="user_id" className="form-control">
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Field>
              {errors.user_id && touched.user_id && (
                <div className="error-message">{errors.user_id}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fitness_class_id">Select Class</label>
              <Field as="select" name="fitness_class_id" id="fitness_class_id" className="form-control">
                <option value="">Select Class</option>
                {classes.map((fitnessClass) => (
                  <option key={fitnessClass.id} value={fitnessClass.id}>
                    {fitnessClass.name}
                  </option>
                ))}
              </Field>
              {errors.fitness_class_id && touched.fitness_class_id && (
                <div className="error-message">{errors.fitness_class_id}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Booking Status</label>
              <Field as="select" name="status" id="status" className="form-control">
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </Field>
              {errors.status && touched.status && (
                <div className="error-message">{errors.status}</div>
              )}
            </div>

            <button type="submit" className="submit-btn">Create Booking</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookingForm;