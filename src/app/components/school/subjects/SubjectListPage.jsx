import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SubjectFormModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";

const dummySubjects = [
  {
    id: 1,
    name: "Mathematics",
    classes: [
      { id: 6, name: "Class 6" },
      { id: 7, name: "Class 7" },
    ],
  },
  {
    id: 2,
    name: "Science",
    classes: [{ id: 7, name: "Class 7" }],
  },
  {
    id: 3,
    name: "English",
    classes: [{ id: 6, name: "Class 6" }],
  },
];


const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchSubjects = () => {
    setSubjects(dummySubjects);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSubject(null);
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Subjects</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Subject</Button>
      </div>
      <div className="row g-4">
        {subjects.map((subject) => (
          <div className="col-md-4" key={subject.id}>
            <SubjectCard
              subject={subject}
              onEdit={() => handleEdit(subject)}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <SubjectFormModal
          show={showModal}
          onHide={handleModalClose}
          onSave={fetchSubjects}
          subject={selectedSubject}
        />
      )}
    </div>
  );
};

export default SubjectListPage;
