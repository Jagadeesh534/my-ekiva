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
import ClassFormModal from "./ClassFormModal";
import axiosInstance from "../../../axiosInstance";
import { useDispatch } from "react-redux";
import { setSelectedClassObj } from "../../../features/studentSlice";

const api = "https://176f-117-202-61-197.ngrok-free.app/api/classrooms/";

const Classes = () => {
  const [expandedClassIds, setExpandedClassIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleExpand = (id) => {
    setExpandedClassIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSectionClick = (cls, section) => {
    dispatch(setSelectedClassObj({ section: section, classId: cls.id,className: cls.name }));
    navigate(`/dashboard/class/students`);
  };

  const handleClassSaved = () => {
    // Will re-fetch when modal is closed
  };

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axiosInstance.get(api);
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
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaChalkboard className="me-2 text-primary" />
                    {cls.name}
                  </h5>
                  <span className="badge bg-primary rounded-pill">
                    {cls.student_count} Students
                  </span>
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
                      {cls.sections.length > 0 ? (
                        cls.sections.map((sec, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center text-primary fw-medium"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSectionClick(cls, sec)}
                          >
                            <span>Section {sec.name}</span>
                            {sec.student_count !== undefined && (
                              <span className="badge bg-info rounded-pill">
                                {sec.student_count}
                              </span>
                            )}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">
                          No Sections
                        </li>
                      )}
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
