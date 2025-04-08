import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const SubjectStaffMapping = () => {
  const [subjects, setSubjects] = useState([]);
  const [staff, setStaff] = useState([]);
  const [mapping, setMapping] = useState({});

  useEffect(() => {
    axios.get("/api/subjects/").then((res) => setSubjects(res.data));
    axios.get("/api/staff/").then((res) => setStaff(res.data));
  }, []);

  const handleMap = async (subjectId, teacherId) => {
    await axios.post(`/api/subjects/${subjectId}/assign-teacher/`, {
      teacher_id: teacherId,
    });
    alert("Mapped successfully!");
  };

  return (
    <div className="container mt-4">
      <h3>Map Subjects to Staff</h3>
      <div className="row">
        {subjects.map((subject) => (
          <div className="col-md-6 mb-4" key={subject.id}>
            <Card className="p-3 shadow rounded-4">
              <h5>{subject.name}</h5>
              <Form.Select
                onChange={(e) => handleMap(subject.id, e.target.value)}
              >
                <option>Select Staff</option>
                {staff.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectStaffMapping;
