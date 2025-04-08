// components/subjects/SubjectForm.jsx
import React, { useState, useEffect } from "react";

const SubjectForm = ({ initialData = {}, onSubmit }) => {
  const [subject, setSubject] = useState({
    name: "",
    code: "",
    classLevel: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subject);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="mb-3">
        <label>Subject Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={subject.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Subject Code</label>
        <input
          type="text"
          name="code"
          className="form-control"
          value={subject.code}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Class Level</label>
        <input
          type="text"
          name="classLevel"
          className="form-control"
          value={subject.classLevel}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        {initialData.id ? "Update Subject" : "Create Subject"}
      </button>
    </form>
  );
};

export default SubjectForm;
