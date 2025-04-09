import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TeacherFormModal = ({ show, onHide, onSave, teacher }) => {
  const [formData, setFormData] = useState({ name: "", subject: "", email: "" });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || "",
        subject: teacher.subject || "",
        email: teacher.email || "",
      });
    } else {
      setFormData({ name: "", subject: "", email: "" });
    }
  }, [teacher]);

  const handleSubmit = () => {
    console.log("Saving teacher:", formData);
    onSave(); // Replace with actual API call
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{teacher ? "Edit Teacher" : "Add Teacher"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject handled"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="teacher@example.com"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeacherFormModal;
