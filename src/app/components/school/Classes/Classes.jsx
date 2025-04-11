import React, { useEffect, useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import {
  FaChalkboard,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ClassFormModal from "./ClassFormModal"; // 👈 Import the modal
import axiosInstance from "../../../axiosInstance";

const api = "https://040f-117-213-190-162.ngrok-free.app/api/classrooms/";
const Classes = () => {
  const [expandedClassIds, setExpandedClassIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [classData, setClassData] = useState([]);

  const toggleExpand = (id) => {
    setExpandedClassIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSectionClick = (classId, section) => {
    navigate(`/dashboard/class/section/students`);
  };

  const handleClassSaved = () => {
    // TODO: refetch or refresh class data from API
    console.log("Class saved!");
  };
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axiosInstance.get(api);
        console.log("Fetched class data:", response);
        setClassData(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClassData();
  }, [showModal]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h3>All Classes</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          Add Class
        </Button>
      </div>

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
                          className="list-group-item text-primary fw-medium"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSectionClick(cls.id, sec)}
                        >
                          Section {sec.name}
                        </li>
                      ))}
                      {cls.sections.length === 0 && (<p>No Sections </p>)}
                    </ul>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      <ClassFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSaved={handleClassSaved}
      />
    </div>
  );
};

export default Classes;
