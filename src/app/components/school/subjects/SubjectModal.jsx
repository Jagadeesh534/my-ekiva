import React, { useEffect, useState } from "react";
import { use } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
const api = "https://22c3-117-202-57-80.ngrok-free.app/api/";


const SubjectFormModal = ({ show, onHide, onSave, subject }) => {
  const [formData, setFormData] = useState({ name: "", classrooms: [] });
  const [errors, setErrors] = useState({});
  const [classData, setClassData] = useState([]);
  const school = useSelector((state) => state.auth.school);

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        classrooms:
          subject.classrooms?.map((c) => ({
            value: c.name,
            label: c.name,
          })) || [],
      });
    } else {
      setFormData({ name: "", classrooms: [] });
    }
    setErrors({});
    
  }, [subject]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axiosInstance.get(api+"classrooms/");
        console.log("Fetched class data:", response);
        const classOptions = response.data.map((c) => ({
          value: c.id,
          label: c.name,
        }));
        setClassData(classOptions);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClassData();
  },[]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Subject name is required";
    if (formData.classrooms.length === 0) newErrors.classes = "At least one class must be selected";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedClasses = formData.classrooms.map((c) => c.value);
    const newSubject = { name: formData.name, classrooms: selectedClasses, school: school.id };

    console.log("Saving subject:", newSubject);
    if (newSubject) {
      const res = await axiosInstance.post(api+"subjects/", newSubject);
      console.log("Subject saved:", res);


    }
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
                options={classData}
                value={formData.classrooms}
                onChange={(selected) => {
                  debugger
                  setFormData({ ...formData, classrooms: selected });
                  setErrors((prev) => ({ ...prev,classrooms: "" }));
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
