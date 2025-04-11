import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";



const sectionsData = {
  "Class 7": [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ],
  "Class 8": [
    { id: 4, name: "A" },
    { id: 5, name: "B" },
    { id: 6, name: "C" },
  ],
  "Class 6": [
    { id: 7, name: "A" },
    { id: 8, name: "B" },
  ],
  "Class 9": [
    { id: 9, name: "A" },
    { id: 10, name: "B" },
  ],
  "Class 5": [
    { id: 11, name: "A" },
    { id: 12, name: "B" },
    { id: 13, name: "C" },
  ],
  "Class 10": [
    { id: 14, name: "A" },
    { id: 15, name: "B" },
  ],
};
const api = "https://040f-117-213-190-162.ngrok-free.app/api/";
const TeacherAssignmentPage = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    username: '',
    user_type: "teacher",
  });
  const [allSubjects, setAllSubjects] = useState([] );
  const [allClasses, setAllClasses] = useState([]);
  const [allSections, setAllSections] = useState([]);

  const [errors, setErrors] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);


 useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get(api + "subjects/");
        setAllSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get(api + "classrooms/");
        setAllClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchSubjects();
    fetchClasses();
  },[]);
  

  const handleInputChange = (field, value) => {
    setTeacherInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!teacherInfo.first_name.trim()) newErrors.first_name = "First name is required";
    if (!teacherInfo.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!teacherInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(teacherInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!teacherInfo.phone_number.trim()) {
      newErrors.phone_number = "Mobile is required";
    } else if (!/^\d{10}$/.test(teacherInfo.phone_number)) {
      newErrors.phone_number = "Must be 10-digit number";
    }
    return newErrors;
  };

  const handleSaveAll = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subjectSet = new Set();
    const classroomMap = {};

    assignments.forEach((a) => {
      const subj = allSubjects.find((s) => s.name === a.subject);
      if (subj) subjectSet.add(subj.id);

      const classObj = allClasses.find((cls) => cls.name === a.className);
      if (classObj) {
        if (!classroomMap[classObj.id]) classroomMap[classObj.id] = new Set();
        a.sections.forEach((sName) => {
          const sectionObj = allSections.find((s) => s.name === sName);
          if (sectionObj) classroomMap[classObj.id].add(sectionObj.id);
        });
      }
    });

    const classroom_section_map = Object.entries(classroomMap).map(([classroomId, sectionSet]) => ({
      classroom: Number(classroomId),
      sections: [...sectionSet],
    }));

    const finalData = {
      user: {
        first_name: teacherInfo.first_name,
        last_name: teacherInfo.last_name,
        email: teacherInfo.email,
        phone_number: teacherInfo.phone_number,
        user_type: "teacher",
        username: teacherInfo.first_name,
      },
      school: 1,
      subjects: [...subjectSet],
      classroom_section_map,
    };

    console.log("Final Payload:", finalData);
    const saveResponse = await axiosInstance.post(api+'teachers/', finalData);
    if (saveResponse.status !== 200) {
    toast.success("Teacher info & assignments saved ✅");
    } else {
      toast.error("Failed to save assignments ❌");
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const a = assignments[index];
      setSelectedSubject(a.subject);
      setSelectedClass(a.className);
      setSelectedSections(a.sections);
      setEditIndex(index);
    } else {
      setSelectedSubject("");
      setSelectedClass("");
      setSelectedSections([]);
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const handleAddOrUpdateAssignment = () => {
    if (!selectedSubject || !selectedClass || selectedSections.length === 0) return;
    const newAssignment = {
      subject: selectedSubject,
      className: selectedClass,
      sections: [...selectedSections],
    };
    if (editIndex !== null) {
      const updated = [...assignments];
      updated[editIndex] = newAssignment;
      setAssignments(updated);
    } else {
      setAssignments([...assignments, newAssignment]);
    }
    setShowModal(false);
    setSelectedSubject("");
    setSelectedClass("");
    setSelectedSections([]);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSectionToggle = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="container bg-white p-4 rounded-4 shadow-sm mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Teacher Assignment</h4>
        <Button variant="success" onClick={handleSaveAll}>💾 Save</Button>
      </div>

      <Card className="shadow-sm mb-4 p-3 rounded-4">
        <Form>
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={teacherInfo.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                isInvalid={!!errors.first_name}
              />
              <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={teacherInfo.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                isInvalid={!!errors.last_name}
              />
              <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={teacherInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={teacherInfo.phone_number}
                onChange={(e) => handleInputChange("phone_number", e.target.value)}
                isInvalid={!!errors.phone_number}
              />
              <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
            </Form.Group>
          </div>
        </Form>
      </Card>

      <Card className="shadow-sm mb-4 p-3 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Assigned Subjects</h5>
          <Button variant="outline-primary" onClick={() => openModal(null)}>
            + Add Assignment
          </Button>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Sections</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr><td colSpan="4" className="text-center text-muted">No assignments yet.</td></tr>
            ) : (
              assignments.map((a, idx) => (
                <tr key={idx}>
                  <td>{a.subject}</td>
                  <td>{a.className}</td>
                  <td>{a.sections.join(", ")}</td>
                  <td>
                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openModal(idx)}>Edit</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(idx)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Assignment" : "Assign Subject"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedClass("");
                setSelectedSections([]);
              }}
            >
              <option value="">Select Subject</option>
              {allSubjects.map((subj) => (
                <option key={subj.name} value={subj.name}>{subj.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedSubject && (
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSections([]);
                  console.log("Selected Class:", e.target.value);
                  setAllSections(allClasses.find((cls) => cls.id == e.target.value).sections);
                }}
              >
                <option value="">Select Class</option>
                {allClasses?.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {selectedClass && (
            <Form.Group className="mb-3">
              <Form.Label>Sections</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {allSections?.map((section) => (
                  <Form.Check
                    key={section.id}
                    inline
                    type="checkbox"
                    label={section.name}
                    checked={selectedSections.includes(section.id)}
                    onChange={() => handleSectionToggle(section.id)}
                  />
                ))}
              </div>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddOrUpdateAssignment}>
            {editIndex !== null ? "Update" : "Save"} Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherAssignmentPage;
