// components/school/Classes/ClassFormModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
const API_BASE = "https://040f-117-213-190-162.ngrok-free.app/"; // Replace with your actual API

const ClassFormModal = ({ show, onHide, onSaved }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const schoolId = useSelector((state)=> state.auth.school.id);// default or fetched
  const [sections, setSections] = useState([{ name: "" }]);

  const handleSectionChange = (index, value) => {
    const updated = [...sections];
    updated[index].name = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { name: "" }]);
  };

  const removeSection = (index) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };
  const handleSubmit = async () => {
    const payload = {
      name,
      grade: grade,
      school_id: schoolId,
      sections,
    };
  
    try {
      console.log("Submitting:", payload);
      await axiosInstance.post(`${API_BASE}api/classrooms/`, payload); // your real API endpoint
      toast.success("Class created successfully! ✅");
      onSaved();
      onHide();
    } catch (error) {
      console.error("Error saving class:", error);
      toast.error("Failed to create class ❌");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Class 10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 10"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </Col>
          </Row>

          <Form.Label>Sections</Form.Label>
          {sections.map((sec, idx) => (
            <Row key={idx} className="mb-2 align-items-center">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Section name (e.g., A)"
                  value={sec.name}
                  onChange={(e) => handleSectionChange(idx, e.target.value)}
                />
              </Col>
              <Col xs="auto">
                {sections.length > 1 && (
                  <Button variant="outline-danger" size="sm" onClick={() => removeSection(idx)}>
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          <Button variant="outline-primary" size="sm" onClick={addSection}>
            + Add Section
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save Class
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassFormModal;
