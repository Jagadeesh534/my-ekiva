import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Collapse,
  Badge,
  Modal,
} from "react-bootstrap";
import { FaBookOpen, FaChevronDown, FaChevronUp, FaUpload } from "react-icons/fa";

const dummyClasses = [
  {
    id: 1,
    name: "Class 7",
    pdfs: [
      { id: 101, title: "Maths Basics", url: "/sample1.pdf" },
      { id: 102, title: "Science Intro", url: "/sample2.pdf" },
    ],
  },
  {
    id: 2,
    name: "Class 8",
    pdfs: [
      { id: 103, title: "Algebra Starter", url: "/sample3.pdf" },
    ],
  },
  {
    id: 3,
    name: "Class 9",
    pdfs: [],
  },
  {
    id: 4,
    name: "Class 10",
    pdfs: [
      { id: 104, title: "Physics Concepts", url: "/sample4.pdf" },
      { id: 105, title: "Chemistry Summary", url: "/sample5.pdf" },
    ],
  },
];

const LibraryAdmin = () => {
  const [classes, setClasses] = useState(dummyClasses);
  const [expandedId, setExpandedId] = useState(null);
  const [modalInfo, setModalInfo] = useState({ show: false, classId: null });
  const [form, setForm] = useState({ title: "", file: null });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openUploadModal = (classId) => {
    setModalInfo({ show: true, classId });
  };

  const handleUpload = () => {
    if (!form.title || !form.file) return alert("Provide title and file");

    const newPdf = {
      id: Date.now(),
      title: form.title,
      url: URL.createObjectURL(form.file),
    };

    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === modalInfo.classId ? { ...cls, pdfs: [...cls.pdfs, newPdf] } : cls
      )
    );

    setModalInfo({ show: false, classId: null });
    setForm({ title: "", file: null });
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">📚 Class-wise PDF Library</h4>
      <div className="row g-4">
        {classes.map((cls) => (
          <div key={cls.id} className="col-md-4">
            <Card className="shadow rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 d-flex align-items-center">
                    <FaBookOpen className="me-2 text-primary" />
                    {cls.name}
                  </h6>
                  <Badge bg="primary" pill>
                    {cls.pdfs.length} Attachments
                  </Badge>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleExpand(cls.id)}
                  >
                    {expandedId === cls.id ? <FaChevronUp /> : <FaChevronDown />}
                  </Button>
                </div>

                <Collapse in={expandedId === cls.id}>
                  <div className="mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => openUploadModal(cls.id)}
                    >
                      <FaUpload className="me-1" /> Add Attachment
                    </Button>

                    {cls.pdfs.length > 0 && (
                      <ul className="mt-3">
                        {cls.pdfs.map((pdf) => (
                          <li key={pdf.id}>
                            <a href={pdf.url} target="_blank" rel="noreferrer">
                              {pdf.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal
        show={modalInfo.show}
        onHide={() => setModalInfo({ show: false, classId: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>PDF Title</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select PDF</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setForm((prev) => ({ ...prev, file: e.target.files[0] }))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalInfo({ show: false, classId: null })}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibraryAdmin;
