import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createUser } from "../API"; 
import './UserForm.css';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

function UserForm() {
  const [loading, setLoading] = useState(false);  // Track loading state
  const [success, setSuccess] = useState(false);   // Track success state

  return (
    <div className="form-container">
      <h1>Create New User</h1>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); // Set loading to true when form is submitting
          createUser(values)
            .then((data) => {
              console.log("User Created:", data);
              setSuccess(true);  // Set success message when user is created
              resetForm(); // Reset the form fields after submission
              setLoading(false); // Set loading to false after submission
              
              // Clear success message after 3 seconds
              setTimeout(() => setSuccess(false), 3000);
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              setLoading(false); // Set loading to false if there's an error
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="user-form">
            <div className="form-group">
              <Field name="name" placeholder="Name" className="input-field" />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <Field name="email" placeholder="Email" className="input-field" />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </button>

            {success && <div className="success-message">User created successfully!</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;