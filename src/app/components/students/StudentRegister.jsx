import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import Loader from '../Loader';
const api  = 'https://22c3-117-202-57-80.ngrok-free.app/api/';
const StudentRegister = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const selectedClass = useSelector((s)=> s.student.selectedClassObj);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    classroom: "",
    section: "",
    roll_number: "",
    date_of_birth: "",
    parent_name: "",
    parent_contact: "",
    joined_date: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.email,
        phone_number: formData.phone_number,
      },
      school: 1,
      classroom: +selectedClass.classId,
      section: +selectedClass.section.id,
      roll_number: formData.roll_number,
      date_of_birth: formData.date_of_birth,
      parent_name: formData.parent_name,
      parent_contact: formData.parent_contact,
      joined_date: formData.joined_date,
      address: formData.address,
    };

    console.log("🎓 Final Student Registration Payload:", payload);
    try {
      const response = await axiosInstance.post(`${api}students/`, payload);
      console.log("Response from server:", response);
      if (response.status === 201) {
        toast.success("Student registered successfully!");
        navigate("/dashboard/students");
      } else {
        toast.error("Failed to register student.");
      }
    } catch (error) {
      console.error("Error during student registration:", error);
      toast.error("Error during registration: " + error?.response?.data?.user?.email[0]);
    }
  };
  if (loading) return < Loader/>;
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">📝 Register New Student</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.email}
                      readOnly
                      onChange={handleChange}
                      placeholder="Username (usually same as email)"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Phone number"
                      required
                    />
                  </Form.Group>
                </Col>
            
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="roll_number"
                      value={formData.roll_number}
                      onChange={handleChange}
                      placeholder="e.g., A123"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Joined Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="joined_date"
                      value={formData.joined_date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parent Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      placeholder="Parent's full name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parent Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="parent_contact"
                      value={formData.parent_contact}
                      onChange={handleChange}
                      placeholder="Parent's contact number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Student's home address"
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mt-2">
                🎓 Register Student
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentRegister;
