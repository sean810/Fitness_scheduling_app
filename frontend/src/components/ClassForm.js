import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createClass } from "../API";

const validationSchema = Yup.object({
  name: Yup.string().required("Class name is required"),
  description: Yup.string().required("Description is required"),
  instructor: Yup.string().required("Instructor name is required"),
  schedule: Yup.date()
    .required("Schedule is required")
    .min(new Date(), "Schedule must be in the future"),
});

function ClassForm() {
  return (
    <Formik
      initialValues={{ name: "", description: "", instructor: "", schedule: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        createClass(values)
          .then((data) => {
            console.log("Class Created:", data);
            resetForm(); // Reset the form after successful submission
          })
          .catch((error) => {
            console.error("Error creating class:", error);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Class Name</label>
            <Field name="name" placeholder="Class Name" style={{ width: "100%", padding: "8px", borderRadius: "4px" }} />
            {errors.name && touched.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              placeholder="Description"
              as="textarea"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", minHeight: "100px" }}
            />
            {errors.description && touched.description && <div style={{ color: 'red', fontSize: '12px' }}>{errors.description}</div>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="instructor">Instructor</label>
            <Field
              name="instructor"
              placeholder="Instructor"
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            />
            {errors.instructor && touched.instructor && <div style={{ color: 'red', fontSize: '12px' }}>{errors.instructor}</div>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="schedule">Schedule</label>
            <Field
              name="schedule"
              type="datetime-local"
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            />
            {errors.schedule && touched.schedule && <div style={{ color: 'red', fontSize: '12px' }}>{errors.schedule}</div>}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Create Class
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ClassForm;