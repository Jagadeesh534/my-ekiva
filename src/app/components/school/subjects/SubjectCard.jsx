import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaChalkboardTeacher } from "react-icons/fa";

const SubjectCard = ({ subject, onEdit }) => {
  return (
    <Card className="shadow rounded-4">
      <Card.Body>
        <h5 className="mb-3">
          <FaChalkboardTeacher className="me-2 text-primary" />
          {subject.name}
        </h5>

        <p className="mb-2">
          <strong>Teachers:</strong>{" "}
          {subject.teachers?.length
            ? subject.teachers.map((t) => t.name).join(", ")
            : "None Assigned"}
        </p>

        <Button variant="outline-secondary" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SubjectCard;
