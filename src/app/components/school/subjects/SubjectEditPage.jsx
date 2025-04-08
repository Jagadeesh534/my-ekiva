// pages/subjects/SubjectEditPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubjectForm from "./SubjectForm";

const SubjectEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const subjectData = {
    id,
    name: "Maths",
    code: "MAT101",
    classLevel: "6th",
  };

  const handleUpdate = (updated) => {
    alert("Subject updated: " + JSON.stringify(updated));
    navigate("/dashboard/subjects");
  };

  return (
    <div>
      <h2>Edit Subject</h2>
      <SubjectForm initialData={subjectData} onSubmit={handleUpdate} />
    </div>
  );
};

export default SubjectEditPage;
