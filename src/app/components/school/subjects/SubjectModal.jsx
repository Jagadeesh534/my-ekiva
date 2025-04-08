import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const dummyTeachers = ["Mr. Sharma", "Ms. Karen", "Mr. Singh", "Ms. Emily"];

const SubjectFormModal = ({ show, onHide, onSave, subject }) => {
  const [formData, setFormData] = useState({ name: "", teachers: [] });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        teachers: subject.teachers?.map((t) => t.name) || [],
      });
    } else {
      setFormData({ name: "", teachers: [] });
    }
  }, [subject]);

  const handleTeacherChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData({ ...formData, teachers: selected });
  };

  const handleSubmit = () => {
    console.log("Saving subject:", formData);
    onSave(); // Refresh dummy data or trigger fetch
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{subject ? "Edit Subject" : "Add Subject"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="subjectName" className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="teacherSelect" className="mb-3">
            <Form.Label>Assign Teachers</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={formData.teachers}
              onChange={handleTeacherChange}
            >
              {dummyTeachers.map((teacher, idx) => (
                <option key={idx} value={teacher}>
                  {teacher}
                </option>
              ))}
            </Form.Control>
            <Form.Text className="text-muted">
              Hold Ctrl (or Cmd) to select multiple teachers.
            </Form.Text>
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
  );
};

export default SubjectFormModal;
