import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [student, setStudent] = useState({
    name: "",
    className: "",
    status: "Active",
    avatar: "",
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registered:", student);
    alert("Student Registered Successfully!");
    navigate("/students"); // Redirect to student list
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">📚 Register New Student</h3>
            <Form onSubmit={handleSubmit}>
              {/* Student Name */}
              <Form.Group controlId="name" className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  placeholder="Enter Student Name"
                  required
                />
              </Form.Group>

              {/* Class Name */}
              <Form.Group controlId="className" className="mb-3">
                <Form.Control
                  type="text"
                  name="className"
                  value={student.className}
                  onChange={handleChange}
                  placeholder="Enter Class Name"
                  required
                />
              </Form.Group>

              {/* Status */}
              <Form.Group controlId="status" className="mb-3">
                <Form.Select
                  name="status"
                  value={student.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>

              {/* Avatar URL */}
              <Form.Group controlId="avatar" className="mb-3">
                <Form.Control
                  type="text"
                  name="avatar"
                  value={student.avatar}
                  onChange={handleChange}
                  placeholder="Enter Avatar URL"
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100">
                🚀 Register Student
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentRegister;
