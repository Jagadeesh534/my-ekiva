import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

const dummyTeachers = [
  {
    id: 1,
    name: "Ms. Juliet",
    email: "juliet@school.com",
    mobile: "9876543210",
  },
  {
    id: 2,
    name: "Mr. Rahul",
    email: "rahul@school.com",
    mobile: "9123456789",
  },
  {
    id: 3,
    name: "Ms. Nisha",
    email: "nisha@school.com",
    mobile: "9876512345",
  },
];

const TeacherListPage = () => {
  const navigate = useNavigate();

  const handleAddTeacher = () => {
    navigate("/dashboard/teachers/assign"); // 👈 Adjust this route if needed
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Teachers</h3>
        <Button variant="primary" onClick={handleAddTeacher}>
          + Add Teacher
        </Button>
      </div>

      <div className="row g-4">
        {dummyTeachers.map((teacher) => (
          <div key={teacher.id} className="col-md-4">
            <Card className="shadow rounded-4">
              <Card.Body>
                <h5 className="mb-2">
                  <FaChalkboardTeacher className="me-2 text-primary" />
                  {teacher.name}
                </h5>
                <p className="mb-1">
                  <strong>Email:</strong> {teacher.email}
                </p>
                <p className="mb-1">
                  <strong>Mobile:</strong> {teacher.mobile}
                </p>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => navigate("/dashboard/teachers/assign")}
                >
                  Edit / Assign Subjects
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherListPage;
