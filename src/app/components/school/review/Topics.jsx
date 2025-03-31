import React from "react";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";

const topicData = {
  eng: ["Verbs", "Paragraphs", "Grammar"],
  math: ["Algebra", "Geometry", "Trigonometry"],
  sci: ["Physics", "Biology", "Chemistry"],
  hist: ["Ancient History", "Medieval History"],
  geo: ["Maps", "Climates"],
};

const Topics = () => {
  const { subjectId } = useParams();
  const topics = topicData[subjectId] || [];

  return (
    <div className="dashboard-container">
<h2 className="dashboard-title">Topics for {subjectId.toUpperCase()}</h2>

<div className="dashboard-row">
{topics.map((topic,index) => (
    <div
    key={index}
    className="dashboard-card"
    onClick={() => handleCardClick(subject.id)}
  >
    <h4 className="card-title">{topic}</h4>
            <ContentCard key={index} title={topic} />
            </div>
        ))}
</div>
</div>

    
  );
};

export default Topics;


