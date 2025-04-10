import React, { useState } from "react";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";

const allSubjects = ["English", "Math", "Science"];

const classData = {
  English: ["Class 7", "Class 8"],
  Math: ["Class 6", "Class 9"],
  Science: ["Class 5", "Class 10"],
};

const sectionsData = {
  "Class 7": ["A", "B", "C"],
  "Class 8": ["A", "B", "C"],
  "Class 6": ["A", "B"],
  "Class 9": ["A", "B"],
  "Class 5": ["A", "B", "C"],
  "Class 10": ["A", "B"],
};

const TeacherAssignmentPage = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    id: 1,
    name: "Ms. Juliet",
    email: "juliet@school.com",
    mobile: "9876543210",
  });

  const [assignments, setAssignments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);

  const handleAddAssignment = () => {
    if (!selectedSubject || !selectedClass || selectedSections.length === 0) return;

    setAssignments((prev) => [
      ...prev,
      {
        subject: selectedSubject,
        className: selectedClass,
        sections: [...selectedSections],
      },
    ]);

    setSelectedSubject("");
    setSelectedClass("");
    setSelectedSections([]);
    setShowModal(false);
  };

  const handleSectionToggle = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSaveAll = () => {
    console.log("Saving teacher info & assignments:", {
      teacherInfo,
      assignments,
    });
    // TODO: Post to backend
  };

  return (
    <div className="container bg-white p-4 rounded-4 shadow-sm mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Teacher Assignment</h4>
        <Button variant="success" onClick={handleSaveAll}>
          💾 Save
        </Button>
      </div>

      {/* Teacher Info Form */}
      <Card className="shadow-sm mb-4 p-3 rounded-4">
        <Form>
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control type="text" value={teacherInfo.id} />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={teacherInfo.name}
                onChange={(e) =>
                  setTeacherInfo({ ...teacherInfo, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={teacherInfo.email}
                onChange={(e) =>
                  setTeacherInfo({ ...teacherInfo, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={teacherInfo.mobile}
                onChange={(e) =>
                  setTeacherInfo({ ...teacherInfo, mobile: e.target.value })
                }
              />
            </Form.Group>
          </div>
        </Form>
      </Card>

      {/* Assigned Subjects Table */}
      <Card className="shadow-sm mb-4 p-3 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Assigned Subjects</h5>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            + Add Assignment
          </Button>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Sections</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx}>
                <td>{a.subject}</td>
                <td>{a.className}</td>
                <td>{a.sections.join(", ")}</td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No assignments yet.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal for Assignment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedClass("");
                setSelectedSections([]);
              }}
            >
              <option value="">Select Subject</option>
              {allSubjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedSubject && (
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSections([]);
                }}
              >
                <option value="">Select Class</option>
                {classData[selectedSubject]?.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {selectedClass && (
            <Form.Group className="mb-3">
              <Form.Label>Sections</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {sectionsData[selectedClass]?.map((section) => (
                  <Form.Check
                    key={section}
                    inline
                    type="checkbox"
                    label={section}
                    checked={selectedSections.includes(section)}
                    onChange={() => handleSectionToggle(section)}
                  />
                ))}
              </div>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssignment}>
            Save Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherAssignmentPage;
