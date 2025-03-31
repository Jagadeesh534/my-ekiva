import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ContentCard from "./ContentCard";

const classes = [
  { id: "7", name: "7th Class"},
  { id: "8", name: "8th Class" },
  { id: "9", name: "9th Class"},
  { id: "10", name: "10th Class"},
];

const Contents = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`class/${id}`);
  };
  
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Select a Class to View Subjects</h2>
      <div className="dashboard-row">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => handleCardClick(cls.id)}
          >
           
            <h4 className="card-title">{cls.name}</h4>
            <p className="card-footer-text m-1">Click to View Subjects</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
