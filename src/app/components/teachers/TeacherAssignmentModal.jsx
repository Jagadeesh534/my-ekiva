import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const dummySubjects = [
  {
    id: 1,
    name: "English",
    classMappings: [
      { classId: 7, className: "Class 7", sections: ["A", "B", "C"] },
      { classId: 8, className: "Class 8", sections: ["A", "B", "C"] }
    ]
  },
  {
    id: 2,
    name: "Science",
    classMappings: [
      { classId: 6, className: "Class 6", sections: ["A", "B"] }
    ]
  }
];

const TeacherAssignmentModal = ({ show, onHide, teacher }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const handleSectionToggle = (subjectId, classId, section) => {
    setAssignments((prev) => {
      const updated = [...prev];
      const subject = updated.find((s) => s.subjectId === subjectId);
      if (!subject) {
        updated.push({
          subjectId,
          subjectName: dummySubjects.find((s) => s.id === subjectId).name,
          classAssignments: [{ classId, sections: [section] }]
        });
      } else {
        const classItem = subject.classAssignments.find((c) => c.classId === classId);
        if (!classItem) {
          subject.classAssignments.push({ classId, sections: [section] });
        } else {
          const index = classItem.sections.indexOf(section);
          if (index > -1) {
            classItem.sections.splice(index, 1);
          } else {
            classItem.sections.push(section);
          }
        }
      }
      return [...updated];
    });
  };

  const handleSave = () => {
    console.log("Assigned Subjects to", teacher.name, assignments);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Assign Subjects to {teacher.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Select Subject</Form.Label>
          <Form.Select
            onChange={(e) =>
              setSelectedSubject(
                dummySubjects.find((s) => s.id === Number(e.target.value))
              )
            }
          >
            <option value="">-- Select Subject --</option>
            {dummySubjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedSubject && (
          <>
            <h6 className="text-muted">Select Sections</h6>
            {selectedSubject.classMappings.map((cls) => (
              <div key={cls.classId} className="mb-3">
                <strong>{cls.className}</strong>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {cls.sections.map((section) => (
                    <Form.Check
                      key={section}
                      label={`Section ${section}`}
                      type="checkbox"
                      onChange={() =>
                        handleSectionToggle(
                          selectedSubject.id,
                          cls.classId,
                          section
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Assignment</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeacherAssignmentModal;
