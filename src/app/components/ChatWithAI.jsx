import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import config from "../config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
function ChatWithAI() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const messagesEndRef = useRef(null);
  const todayDate = new Date().toISOString().split("T")[0];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${config.API_BASE}generate/`,
          {
            params: { user_id: userInfo.id },
          }
        );
        const groupedData = response.data.data.reduce((acc, item) => {
          const createdAt = new Date(item.date);
          const date = !isNaN(createdAt)
            ? createdAt.toISOString().split("T")[0]
            : "Unknown Date";

          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});

        const finalData = Object.entries(groupedData).map(
          ([date, messages]) => ({
            date,
            messages,
          })
        );

        setData(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const messagesForDate = data.find((item) => item.date === date);
    const reversedContentMessage = {
      ...messagesForDate?.messages[0],
      content: [...(messagesForDate?.messages[0]?.content || [])].reverse(),
    };
    setSelectedMessages(reversedContentMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || !selectedMessages) return;

    setIsLoading(true);

    try {
      const res = await axiosInstance.post(`${config.API_BASE}generate/`, {
        user_id: userInfo.id,
        topic: cleanPrompt,
      });

      ;
      const newContent = res.data.data[0].content[0];
      ;
      console.log("New content:", newContent);

      // Append to selectedMessages.content
      setSelectedMessages((prev) => ({
        ...prev,
        content: [...prev.content, newContent],
      }));
    } catch (error) {
      const fallbackEntry = {
        topic: cleanPrompt,
        content: "❌ Failed to fetch response.",
        created_at: new Date().toISOString(),
      };
      setSelectedMessages((prev) => ({
        ...prev,
        content: [...prev.content, fallbackEntry],
      }));
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Text copied to clipboard!"),
      (err) => toast.error("Failed to copy text: " + err)
    );
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-light text-dark p-3 border-end"
        style={{ width: "250px" }}
      >
        <h5 className="mb-4">Askiva</h5>
        <input className="form-control mb-4" placeholder="Search" />
        <div className="d-flex flex-column">
          {data.map((item, idx) => (
            <Button
              key={idx}
              variant={
                item.date === selectedDate ? "secondary" : "outline-secondary"
              }
              className="mb-2"
              onClick={() => handleDateSelect(item.date)}
            >
              {item.date}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow-1 d-flex flex-column bg-white">
        <div
          className="flex-grow-1 overflow-auto p-4"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {selectedMessages?.content?.map((msg, index) => (
            <React.Fragment key={index}>
              {/* Question (Topic) - Right aligned */}
              <div className="d-flex justify-content-end mb-2">
                <div
                  className="p-3 rounded shadow-sm text-white"
                  style={{
                    backgroundColor: "#007bff",
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.topic}
                </div>
              </div>

              {/* Answer (Content) - Left aligned */}
              <div className="d-flex justify-content-start mb-4">
                <div
                  className="p-3 rounded shadow-sm"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#212529",
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
                <div className="d-flex align-items-start ms-2">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Copy to clipboard</Tooltip>}
                  >
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => copyToClipboard(msg.content)}
                    >
                      <FaCopy />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </React.Fragment>
          ))}

          {isLoading && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <Form
          onSubmit={handleSubmit}
          className="d-flex p-3 border-top bg-white"
        >
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Ask something like 'What is photosynthesis?'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="ms-2"
            disabled={isLoading || selectedDate !== todayDate}
          >
            {isLoading ? "..." : "Send"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChatWithAI;
