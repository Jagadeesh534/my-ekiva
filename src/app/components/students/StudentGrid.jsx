import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, selectedStudnet } from "../../features/studentSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const StudentGrid = ({ students }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const selectedClass = useSelector((state) => state.student.selectedClassObj);
  const studentsPerPage = 10;

  const filteredStudents = students.filter((student) =>
    student.user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="grid-container">
      {/* Top Bar: Class Info + Search + Add */}
      <div className="row align-items-center mb-4 g-2">
        <div className="col-md-3">
          <h5 className="text-muted">
            📘 Class: <strong>Class {selectedClass.className}</strong>, Section <strong>{selectedClass.section.name}</strong>
          </h5>
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search student by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3 text-end">
          <Button
            onClick={() => navigate(`/dashboard/class/students/register`)}
          >
            + Add Student
          </Button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid-row">
        {currentStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          currentStudents.map((student) => (
            <div className="student-card" key={student.id}>
              <img
                src={`https://ui-avatars.com/api/?name=${student.user.first_name}+${student.user.last_name}&background=0D8ABC&color=fff&bold=true`}
                alt={`${student.user.first_name} ${student.user.last_name}`}
                className="student-avatar"
              />
              <h4 className="student-name">
                {student.user.first_name} {student.user.last_name}
              </h4>
              <p className="student-roll">🎓 Roll No: {student.roll_number}</p>
              <p className="student-class">{student?.className}</p>
              <p
                className={`student-status ${
                  student.status === "Active" ? "text-success" : "text-danger"
                }`}
              >
                {student.status}
              </p>

              {/* Actions */}
              <div className="card-actions">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => {
                    dispatch(selectedStudnet(student.id));
                    navigate(`/dashboard/students/view`);
                  }}
                >
                  View
                </button>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    dispatch(selectedStudnet(student.id));
                    navigate(`/dashboard/students/edit`);
                  }}
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
      <div className="pagination-container mt-4">
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
