import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperclip } from "react-icons/fa";

function SmartClassroomChat({ role }) {
  const isStudent = role === "student";
  const isTeacher = role === "teacher";

  const subjects = ["Science", "Maths", "English", "Social Studies"];

  const teacherMap = {
    Science: ["Spencer", "Karen"],
    Maths: ["Anil", "Meera"],
    English: ["Raj", "Lara"],
    "Social Studies": ["Nina", "Jack"],
  };

  const studentMap = {
    Science: ["Shawn", "Priya"],
    Maths: ["Ravi", "Tina"],
    English: ["Aman", "Lily"],
    "Social Studies": ["Dev", "Zara"],
  };

  const [selectedSubject, setSelectedSubject] = useState(isStudent ? "Science" : null);
  const [chatMessages, setChatMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleSend = () => {
    if (!selectedSubject || !inputMessage.trim()) return;

    const sender = isStudent ? "Student" : "Teacher";
    const newMessage = {
      sender,
      text: inputMessage,
      attachment: attachment ? URL.createObjectURL(attachment) : null,
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedSubject]: [...(prev[selectedSubject] || []), newMessage],
    }));

    setInputMessage("");
    setAttachment(null);
  };

  return (
    <div className="container-fluid py-3 px-4">
      <div className="row shadow rounded border">
        {/* Sidebar */}
        <div className="col-md-4 bg-light p-3 border-end">
          <h6
            className="fw-bold text-white py-2 px-3 rounded"
            style={{ backgroundColor: "#4A90E2" }}
          >
            📚 Select Subject
          </h6>

          <ul className="list-group mt-3">
            {subjects.map((subj) => (
              <li
                key={subj}
                className={`list-group-item list-group-item-action ${
                  selectedSubject === subj ? "bg-primary text-white" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedSubject(subj)}
              >
                {subj}
              </li>
            ))}
          </ul>

          <div className="mt-4 ps-1">
            <strong>
              {isStudent ? "👩‍🏫 Teachers" : "👨‍🎓 Students"}
            </strong>
            <ul className="mt-1">
              {(isStudent
                ? teacherMap[selectedSubject]
                : studentMap[selectedSubject]
              )?.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="col-md-8 d-flex flex-column p-3">
          <div
            className="mb-3 px-3 py-2 rounded text-white"
            style={{ backgroundColor: "#4A90E2" }}
          >
            📘 {selectedSubject ? `${selectedSubject} Chat` : "Select a Subject"}
          </div>

          {/* Chat Messages */}
          <div
            className="flex-grow-1 bg-white border rounded p-3 mb-2 overflow-auto"
            style={{ height: "400px" }}
          >
            {(chatMessages[selectedSubject] || []).map((msg, index) => (
              <div key={index} className="mb-3">
                <div className="fw-semibold">{msg.sender}:</div>
                <div>{msg.text}</div>
                {msg.attachment && (
                  <div>
                    📎 <a href={msg.attachment} target="_blank" rel="noreferrer">View File</a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="d-flex gap-2">
            <label className="btn btn-outline-secondary">
              <FaPaperclip />
              <input
                type="file"
                onChange={(e) => setAttachment(e.target.files[0])}
                hidden
              />
            </label>
            <input
              type="text"
              className="form-control"
              value={inputMessage}
              placeholder="Type your message..."
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleSend} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartClassroomChat;
