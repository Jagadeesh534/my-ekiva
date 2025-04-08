// pages/subjects/SubjectListPage.jsx
import React, { useEffect, useState } from "react";
import SubjectGrid from "./SubjectGrid";
import axiosInstance from '../../../axiosInstance';
import Loader from "../../Loader";
const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugger
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("subjects/");
        setSubjects(response.data);
        setLoading(false);
        console.log("Subjects fetched:", response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this subject?");
    if (confirm) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };
  if(loading) return <Loader />;
  return (
    <div>
      <h2>Subjects</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => (window.location.href = "/dashboard/subjects/create")}
      >
        ➕ Add Subject
      </button>
      <SubjectGrid subjects={subjects} onDelete={handleDelete} />
    </div>
  );
};

export default SubjectListPage;
