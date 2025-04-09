import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

// Dummy teachers
const dummyTeachers = [
  { id: 1, name: "Mr. Sharma" },
  { id: 2, name: "Ms. Karen" },
  { id: 3, name: "Mr. Singh" },
  { id: 4, name: "Ms. Emily" },
];

// Dummy classes
const dummyClasses = [
  { id: 1, name: "Class 6" },
  { id: 2, name: "Class 7" },
  { id: 3, name: "Class 8" },
  { id: 4, name: "Class 9" },
];

// Convert to react-select format
const teacherOptions = dummyTeachers.map((t) => ({
  value: t.name,
  label: t.name,
}));
const classOptions = dummyClasses.map((c) => ({
  value: c.name,
  label: c.name,
}));

const SubjectFormModal = ({ show, onHide, onSave, subject }) => {
  const [formData, setFormData] = useState({
    name: "",
    teachers: [],
    classes: [],
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        teachers:
          subject.teachers?.map((t) => ({
            value: t.name,
            label: t.name,
          })) || [],
        classes:
          subject.classes?.map((c) => ({
            value: c.name,
            label: c.name,
          })) || [],
      });
    } else {
      setFormData({ name: "", teachers: [], classes: [] });
    }
  }, [subject]);

  const handleSubmit = () => {
    const selectedTeachers = formData.teachers.map((t) => ({
      name: t.value,
    }));

    const selectedClasses = formData.classes.map((c) => ({
      name: c.value,
    }));

    const newSubject = {
      name: formData.name,
      teachers: selectedTeachers,
      classes: selectedClasses,
    };

    console.log("Saving subject:", newSubject);
    onSave(newSubject); // optionally pass data back
    onHide();
  };

  return (
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          {/* Teacher Selection */}
          <Form.Group controlId="teacherMultiSelect" className="mb-3">
            <Form.Label>Assign Teachers</Form.Label>
            <Select
              isMulti
              options={teacherOptions}
              value={formData.teachers}
              onChange={(selected) =>
                setFormData({ ...formData, teachers: selected })
              }
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select one or more teachers..."
            />
          </Form.Group>

          {/* Class Selection */}
          <Form.Group controlId="classMultiSelect" className="mb-3">
            <Form.Label>Associate Classes</Form.Label>
            <Select
              isMulti
              options={classOptions}
              value={formData.classes}
              onChange={(selected) =>
                setFormData({ ...formData, classes: selected })
              }
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select one or more classes..."
            />
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
