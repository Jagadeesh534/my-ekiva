import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TeacherFormModal from "./TeacherFormModal";
import TeacherCard from "./TeacherCard";

const dummyTeachers = [
  { id: 1, name: "Mr. Sharma", subject: "Mathematics", email: "sharma@school.com" },
  { id: 2, name: "Ms. Karen", subject: "Science", email: "karen@school.com" },
  { id: 3, name: "Mr. Singh", subject: "English", email: "singh@school.com" },
];

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachers = () => {
    setTeachers(dummyTeachers);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Teachers</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Teacher</Button>
      </div>
      <div className="row g-4">
        {teachers.map((teacher) => (
          <div className="col-md-4" key={teacher.id}>
            <TeacherCard teacher={teacher} onEdit={() => handleEdit(teacher)} />
          </div>
        ))}
      </div>

      {showModal && (
        <TeacherFormModal
          show={showModal}
          onHide={handleModalClose}
          onSave={fetchTeachers}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
};

export default TeacherListPage;
