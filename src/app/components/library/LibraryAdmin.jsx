import React, { useState } from "react";
import { Card, Button, Form, Collapse, Alert } from "react-bootstrap";
import { FaBookOpen, FaChevronDown, FaChevronUp, FaEye } from "react-icons/fa";

const LibraryAdmin = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("class");
  const [classLevel, setClassLevel] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const handleUpload = () => {
    if (!file || !title) return alert("Provide title and file");
    const newPdf = {
      id: Date.now(),
      title,
      url: URL.createObjectURL(file),
      category,
      classLevel: category === "class" ? classLevel : null,
    };
    setPdfs((prev) => [...prev, newPdf]);
    setTitle("");
    setFile(null);
    setClassLevel("");
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">📤 Upload PDFs</h4>
      <Card className="p-3 mb-4 shadow-sm">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="class">Class-wise</option>
              <option value="gk">General Knowledge</option>
            </Form.Select>
          </Form.Group>
          {category === "class" && (
            <Form.Group className="mb-2">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Select PDF</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Button onClick={handleUpload}>Upload</Button>
        </Form>
      </Card>

      <h5 className="mb-3">📚 Uploaded PDFs</h5>
      {pdfs.length === 0 && <Alert variant="info">No PDFs uploaded</Alert>}

      <div className="row g-4">
        {pdfs.map((pdf) => (
          <div key={pdf.id} className="col-md-4">
            <Card className="shadow rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 d-flex align-items-center">
                    <FaBookOpen className="me-2 text-primary" />
                    {pdf.title}
                  </h6>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleExpand(pdf.id)}
                  >
                    {expandedId === pdf.id ? <FaChevronUp /> : <FaChevronDown />}
                  </Button>
                </div>

                <Collapse in={expandedId === pdf.id}>
                  <div className="mt-3">
                    <p className="mb-1">
                      Category: <strong>{pdf.category === "class" ? "Class-wise" : "General Knowledge"}</strong>
                    </p>
                    {pdf.category === "class" && (
                      <p className="mb-1">Class: <strong>{pdf.classLevel}</strong></p>
                    )}
                    <div className="d-flex gap-2 mt-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => window.open(pdf.url, "_blank")}
                      >
                        <FaEye className="me-1" />
                        View
                      </Button>
                      <a href={pdf.url} download className="btn btn-outline-success btn-sm">
                        Download
                      </a>
                    </div>
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

export default LibraryAdmin;
