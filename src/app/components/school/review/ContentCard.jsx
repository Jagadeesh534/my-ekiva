import React from "react";

const ContentCard = ({ title, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
