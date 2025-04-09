import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Import Edit Icon
import { useDispatch, useSelector } from "react-redux";

const StudentEdit = ({ students }) => {
  const id = useSelector((s)=>s.student.selectedStudent)
  const navigate = useNavigate();

  // Find Student by ID
  const selectedStudent = students.find(
    (student) => student.id === parseInt(id)
  );

  // State to Hold Student Data
  const [student, setStudent] = useState({
    name: "",
    className: "",
    status: "Active",
    avatar: "",
  });

  // Set Student Data when Component Loads
  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    } else {
      alert("Student not found!");
      navigate("/dashboard/students"); // Redirect if not found
    }
  }, [selectedStudent, navigate]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle Avatar Upload and Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStudent({ ...student, avatar: imageUrl });
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Updated Student:", student);
    alert("✅ Student Details Updated Successfully!");
    navigate("/dashboard/students"); // Redirect to student list
  };

  // Handle Cancel Action
  const handleCancel = () => {
    navigate("/dashboard/students"); // Redirect without saving
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">✏️ Edit Student Details</h3>

            {/* Avatar Upload with Edit Button */}
           {/* Avatar Upload with Edit Button */}
{/* Avatar Upload with Edit Icon */}
<div className="avatar-container text-center mb-3 position-relative">
  {/* Student Avatar */}
  <img
    src={student.avatar || "https://via.placeholder.com/120"}
    alt={student.name}
    className="avatar-image rounded-circle"
  />
  
  {/* Hidden File Input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    id="avatar-upload"
    className="d-none"
  />
  
  {/* Label for Icon */}
  <label htmlFor="avatar-upload" className="edit-icon">
    <FaEdit />
  </label>
</div>



            {/* Edit Form */}
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

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-between">
                <Button variant="success" type="submit" className="w-45">
                  💾 Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="w-45"
                >
                  ❌ Cancel
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentEdit;
