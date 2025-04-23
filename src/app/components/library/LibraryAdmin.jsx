import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const LibraryAdmin = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("class");
  const [classLevel, setClassLevel] = useState("");

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

  return (
    <div className="p-4">
      <h4>📤 Upload PDFs</h4>
      <Card className="p-3 mb-4">
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
            <Form.Control type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>
          <Button onClick={handleUpload}>Upload</Button>
        </Form>
      </Card>

      <h5>📚 Uploaded PDFs</h5>
      {pdfs.length === 0 && <Alert variant="info">No PDFs uploaded</Alert>}
      {pdfs.map((item) => (
        <div key={item.id} className="mb-2">
          {item.title} ({item.category === "class" ? `Class: ${item.classLevel}` : "General"})
        </div>
      ))}
    </div>
  );
};

export default LibraryAdmin;
