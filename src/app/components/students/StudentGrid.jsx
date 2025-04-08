import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
} from "../../features/studentSlice";
import { useNavigate } from "react-router-dom";

const StudentGrid = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  

  // Filtered Students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get Current Page Data
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Delete Student
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="grid-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search student by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Student Cards */}
      <div className="grid-row">
        {currentStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          currentStudents.map((student) => (
            <div className="student-card" key={student.id}>
              <img
                src={student.avatar}
                alt={student.name}
                className="student-avatar"
              />
              <h4 className="student-name">{student.name}</h4>
              <p className="student-roll">🎓 Roll No: {student.rollNumber}</p>

              <p className="student-class">{student.className}</p>
              <p
                className={`student-status ${
                  student.status === "Active" ? "text-success" : "text-danger"
                }`}
              >
                {student.status}
              </p>

              {/* View, Edit & Delete Buttons */}
              <div className="card-actions">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() =>
                    navigate(`/dashboard/students/view/${student.id}`)
                  }
                >
                  View
                </button>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() =>
                    navigate(`/dashboard/students/edit/${student.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({
          length: Math.ceil(filteredStudents.length / studentsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default StudentGrid;
