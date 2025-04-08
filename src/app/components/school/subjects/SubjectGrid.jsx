// components/subjects/SubjectGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SubjectGrid = ({ subjects, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="grid-container">
      <div className="grid-row">
        {subjects.length === 0 ? (
          <p>No subjects found.</p>
        ) : (
          subjects?.map((subject) => (
            <div className="student-card" key={subject.id}>
              <h4 className="student-name">{subject.name}</h4>
              <p className="student-roll">📘 Code: {subject.code}</p>
              <p className="student-class">📚 Class: {subject.classLevel}</p>

              <div className="card-actions">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() =>
                    navigate(`/dashboard/subjects/edit/${subject.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(subject.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectGrid;
