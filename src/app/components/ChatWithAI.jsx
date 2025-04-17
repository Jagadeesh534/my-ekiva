import React, { useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import config from "../config";
import Loader from "./Loader";

function ChatWithAI() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // full history
  const [selectedIndex, setSelectedIndex] = useState(null); // which message is being viewed
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const res = await axiosInstance.get(
        `${config.API_BASE}generate/?topic=${encodeURIComponent(prompt)}`
      );

      const parsed = res.data?.parsed;

      const newEntry = {
        prompt,
        response: parsed,
      };

      setChatHistory((prev) => [...prev, newEntry]);
      setSelectedIndex(chatHistory.length); // select latest
    } catch (err) {
      console.error("Error:", err);
      const fallback = {
        prompt,
        response: {
          basic: "❌ Failed to fetch response",
          medium: "",
          advanced: "",
        },
      };
      setChatHistory((prev) => [...prev, fallback]);
      setSelectedIndex(chatHistory.length);
    } finally {
      setPrompt("");
      setIsLoading(false);
    }
  };

  const selectedChat = chatHistory[selectedIndex];

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Sidebar */}
      <div
        className="bg-light border-end border-2 p-3"
        style={{ width: "100%", maxWidth: "250px", overflowY: "auto" }}
      >
        <h5 className="mb-3 text-primary">🧠 Chat History</h5>
        {chatHistory.map((item, idx) => (
          <div
            key={idx}
            className={`small p-2 mb-2 rounded text-truncate ${
              selectedIndex === idx ? "bg-primary text-white" : "bg-white text-dark border"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedIndex(idx)}
            title={item.prompt}
          >
            • {item.prompt}
          </div>
        ))}
      </div>

      {/* Chat View */}
      <div className="flex-grow-1 d-flex flex-column bg-white">
        <div
          className="flex-grow-1 overflow-auto p-4"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {isLoading && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" />
            </div>
          )}

          {!isLoading && selectedChat && (
            <>
              <h5 className="text-primary mb-3">📝 You asked:</h5>
              <Card className="mb-4">
                <Card.Body>{selectedChat.prompt}</Card.Body>
              </Card>

              <h5 className="text-success mb-3">🤖 AI Response</h5>
              <div className="row g-4">
                {["advanced", "medium", "basic"].map((level) => (
                  <div className="col-md-4" key={level}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Header className="text-capitalize bg-secondary text-white fw-bold">
                        {level}
                      </Card.Header>
                      <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                        {selectedChat.response?.[level] || "No content"}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isLoading && chatHistory.length === 0 && (
            <div className="text-center text-muted pt-5">
              Start by entering a topic to generate educational content.
            </div>
          )}
        </div>

        {/* Chat Input */}
        <Form onSubmit={handleSubmit} className="d-flex p-3 border-top bg-light">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Type a topic like 'Artificial Intelligence'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" className="ms-2" disabled={isLoading}>
            {isLoading ? "..." : "Send"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChatWithAI;
