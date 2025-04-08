import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import { FaChalkboard, FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const classData = [
  {
    id: 1,
    name: "Class 1",
    sections: ["A", "B", "C"],
  },
  {
    id: 2,
    name: "Class 2",
    sections: ["A", "B"],
  },
  {
    id: 3,
    name: "Class 3",
    sections: ["A"],
  },
];

const Classes = () => {
  const [expandedClassIds, setExpandedClassIds] = useState([]);
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    if (expandedClassIds.includes(id)) {
      setExpandedClassIds(expandedClassIds.filter((cid) => cid !== id));
    } else {
      setExpandedClassIds([...expandedClassIds, id]);
    }
  };

  const handleSectionClick = (classId, section) => {
    navigate(`/dashboard/students/class/${classId}/section/${section}`);
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {classData.map((cls) => (
          <div key={cls.id} className="col-md-4">
            <Card className="shadow rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>
                    <FaChalkboard className="me-2 text-primary" />
                    {cls.name}
                  </h5>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleExpand(cls.id)}
                  >
                    {expandedClassIds.includes(cls.id) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </Button>
                </div>

                <Collapse in={expandedClassIds.includes(cls.id)}>
                  <div className="mt-3">
                    <h6>
                      <FaUsers className="me-2 text-success" />
                      Sections
                    </h6>
                    <ul className="list-group list-group-flush">
                      {cls.sections.map((sec, index) => (
                        <li
                          key={index}
                          className="list-group-item text-primary fw-medium cursor-pointer"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSectionClick(cls.id, sec)}
                        >
                          Section {sec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
