import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import SubjectFormModal from "./SubjectModal";
import SubjectCard from "./SubjectCard";
import axiosInstance from "../../../axiosInstance";
import Loader from "../../Loader";
import { useSelector } from "react-redux";

const API_BASE = "https://176f-117-202-61-197.ngrok-free.app/api";

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const school = useSelector((state) => state.auth.school);

  // Stable function using useCallback to avoid refetching due to re-renders
  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_BASE}/subjects?school_id=${school.id}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  }, [school.id]);

  useEffect(() => {
    fetchSubjects(); // Will run only once
  }, [fetchSubjects]);

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
        {subjects.length === 0 ? (
          <p className="text-muted">No subjects available.</p>
        ) : (
          subjects.map((subject) => (
            <div className="col-md-4" key={subject.id}>
              <SubjectCard
                subject={subject}
                onEdit={() => handleEdit(subject)}
              />
            </div>
          ))
        )}
      </div>

      {showModal && (
        <SubjectFormModal
          show={showModal}
          onHide={handleModalClose}
          onSave={fetchSubjects} // Triggers refresh after save
          subject={selectedSubject}
        />
      )}
    </div>
  );
};

export default SubjectListPage;
