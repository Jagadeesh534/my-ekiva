import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const StudentView = ({ students }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find Student by ID
  const student = students.find((student) => student.id === parseInt(id));

  // If student not found
  if (!student) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-danger">⚠️ Student not found!</h4>
        <Button variant="secondary" onClick={() => navigate("/dashboard/students")}>
          🔙 Back to Students
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <div className="text-center">
              <div className="avatar-container mb-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="avatar-image rounded-circle"
                />
              </div>
              <h3 className="student-name mb-2">{student.name}</h3>
              <p className="student-class text-muted mb-1">
                🎓 Class: {student.className}
              </p>
              <p
                className={`student-status ${
                  student.status === "Active" ? "text-success" : "text-danger"
                }`}
              >
                {student.status === "Active" ? "✅ Active" : "❌ Inactive"}
              </p>
              <p className="student-roll text-info">
                📚 Roll Number: <strong>{student.rollNumber}</strong>
              </p>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/dashboard/students")}
              >
                🔙 Back to Students
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentView;
