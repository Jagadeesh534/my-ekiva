import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

// Dummy PDFs
const dummyPdfs = [
  { id: 1, title: "Class 6 - Maths", url: "/assets/sample.pdf", category: "class", classLevel: "6" },
  { id: 2, title: "World GK", url: "/assets/sample.pdf", category: "gk", classLevel: null },
];

const LibraryUser = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const filtered = dummyPdfs.filter(
    (pdf) => pdf.category === "gk" || pdf.classLevel === selectedClass
  );

  return (
    <div className="p-4">
      <h4>📖 Library</h4>
      <Form.Select className="mb-4" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">All Classes</option>
        <option value="6">Class 6</option>
        <option value="7">Class 7</option>
      </Form.Select>

      {filtered.map((pdf) => (
        <Card key={pdf.id} className="mb-3 p-3">
          <h6>{pdf.title}</h6>
          <div className="d-flex gap-2">
            <Button onClick={() => { setSelectedPdf(pdf); setShowModal(true); }}>View</Button>
            <Button variant="outline-success" href={pdf.url} download>Download</Button>
          </div>
        </Card>
      ))}

      {/* <PdfViewerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        pdfUrl={selectedPdf?.url}
        title={selectedPdf?.title}
      /> */}
    </div>
  );
};

export default LibraryUser;
