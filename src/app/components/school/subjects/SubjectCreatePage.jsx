// pages/subjects/SubjectCreatePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SubjectForm from "./SubjectForm";

const SubjectCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = (subject) => {
    alert("Subject created: " + JSON.stringify(subject));
    navigate("/dashboard/subjects");
  };

  return (
    <div>
      <h2>Create Subject</h2>
      <SubjectForm onSubmit={handleCreate} />
    </div>
  );
};

export default SubjectCreatePage;
