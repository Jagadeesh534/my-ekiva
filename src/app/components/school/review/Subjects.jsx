import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContentCard from "./ContentCard";

const subjectData = {
  7: [
    { id: "eng", name: "English", image: "/images/english.jpg" },
    { id: "math", name: "Mathematics", image: "/images/math.jpg" },
    { id: "sci", name: "Science", image: "/images/science.jpg" },
  ],
  8: [
    { id: "eng", name: "English", image: "/images/english.jpg" },
    { id: "hist", name: "History", image: "/images/history.jpg" },
    { id: "geo", name: "Geography", image: "/images/geography.jpg" },
  ],
};

const Subjects = () => {
  const { classId } = useParams();
  const subjects = subjectData[classId] || [];
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`${id}/topics`);
  };
  
  

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Subjects for {classId}th Class</h2>

      <div className="dashboard-row">
      {subjects.map((subject) => (
          <div
            key={subject.id}
            className="dashboard-card"
            onClick={() => handleCardClick(subject.id)}
          >
           
            <h4 className="card-title">{subject.name}</h4>
            <p className="card-footer-text m-1">Click to View Topics</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
