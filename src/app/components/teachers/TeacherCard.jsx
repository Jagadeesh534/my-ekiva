import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";

const TeacherCard = ({ teacher, onEdit }) => {
  return (
    <Card className="shadow rounded-4">
      <Card.Body>
        <h5 className="mb-2">
          <FaUserTie className="me-2 text-primary" />
          {teacher.name}
        </h5>
        <p><strong>Subject:</strong> {teacher.subject}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <Button variant="outline-secondary" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TeacherCard;
