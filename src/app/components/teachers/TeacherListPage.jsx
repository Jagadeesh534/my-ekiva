import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import axiosInstance from "../../axiosInstance";
const api = 'https://040f-117-213-190-162.ngrok-free.app/api/';

const TeacherListPage = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = React.useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get(`${api}teachers/`);
        console.log(response.data);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
  
    fetchTeachers();
  }, []);
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
        {teachers.map((teacher) => (
          <div key={teacher.id} className="col-md-4">
            <Card className="shadow rounded-4">
              <Card.Body>
                <h5 className="mb-2">
                  <FaChalkboardTeacher className="me-2 text-primary" />
                  {teacher.user.first_name} {teacher.user.last_name}
                </h5>
                <p className="mb-1">
                  <strong>Email:</strong> {teacher.user.email}
                </p>
                <p className="mb-1">
                  <strong>Mobile:</strong> {teacher.user.phone_number}
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
