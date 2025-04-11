import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy classes
const dummyClasses = [
  { id: 1, name: "Class 6" },
  { id: 2, name: "Class 7" },
  { id: 3, name: "Class 8" },
  { id: 4, name: "Class 9" },
];

const classOptions = dummyClasses.map((c) => ({
  value: c.name,
  label: c.name,
}));

const SubjectFormModal = ({ show, onHide, onSave, subject }) => {
  const [formData, setFormData] = useState({ name: "", classes: [] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        classes:
          subject.classes?.map((c) => ({
            value: c.name,
            label: c.name,
          })) || [],
      });
    } else {
      setFormData({ name: "", classes: [] });
    }
    setErrors({});
  }, [subject]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Subject name is required";
    if (formData.classes.length === 0) newErrors.classes = "At least one class must be selected";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedClasses = formData.classes.map((c) => ({ name: c.value }));
    const newSubject = { name: formData.name, classes: selectedClasses };

    console.log("Saving subject:", newSubject);
    toast.success(subject ? "Subject updated successfully!" : "Subject added successfully!");
    onSave(newSubject);
    onHide();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{subject ? "Edit Subject" : "Add Subject"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Subject Name */}
            <Form.Group controlId="subjectName" className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Class Selection */}
            <Form.Group controlId="classMultiSelect" className="mb-3">
              <Form.Label>Associate Classes</Form.Label>
              <Select
                isMulti
                options={classOptions}
                value={formData.classes}
                onChange={(selected) => {
                  setFormData({ ...formData, classes: selected });
                  setErrors((prev) => ({ ...prev, classes: "" }));
                }}
                classNamePrefix="select"
                placeholder="Select one or more classes..."
              />
              {errors.classes && (
                <div className="text-danger mt-1">{errors.classes}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubjectFormModal;
