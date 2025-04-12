import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SubjectFormModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";
import axiosInstance from "../../../axiosInstance";
import Loader from "../../Loader";
import { useSelector } from "react-redux";
const API_BASE = "https://22c3-117-202-57-80.ngrok-free.app/api";
const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const school = useSelector((state)=> state.auth.school);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_BASE+"/subjects?school_id="+school.id);
      setSubjects(response.data);
      console.log(subjects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

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
  if (loading) return <Loader />;
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
