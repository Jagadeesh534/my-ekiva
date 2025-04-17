import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, ListGroup, Card, Spinner } from "react-bootstrap";
import axiosInstance from "../axiosInstance";

const WEBSOCKET_BASE = "wss://176f-117-202-61-197.ngrok-free.app/ws/chat"; // Replace with actual
const API_BASE = "https://176f-117-202-61-197.ngrok-free.app/api";
const dummyStudent = [{ id: 15, first_name: "Teja", last_name: "Kumar" }];

const ChatPage = () => {
  const loginType = useSelector((state) => state.auth.loginType); // "student" or "teacher"
  const user = useSelector((state) => state.auth.userInfo);
  const school = useSelector((state) => state.auth.school);

  const isStudent = loginType === "student";

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [participants, setParticipants] = useState([]); // Teachers or Students
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const getChatroomId = (otherUserId) => [user.id, otherUserId].sort().join("-");

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${API_BASE}/subjects?school_id=${school.id}`);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  }, [school.id]);

  const fetchParticipants = async (subjectId) => {
    if (!subjectId) return;
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${API_BASE}/subjects/${subjectId}/details/`);
      setParticipants(isStudent ? response.data.teachers : dummyStudent);
    } catch (err) {
      console.error("Error fetching participants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isStudent) {
      setParticipants(dummyStudent);
    }
    fetchSubjects();
  }, [fetchSubjects]);

  useEffect(() => {
    if (!selectedUser) return;

    const chatroomId = getChatroomId(selectedUser.id);
    socketRef.current = new WebSocket(`${WEBSOCKET_BASE}/${chatroomId}/`);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onclose = () => console.log("WebSocket closed");

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [selectedUser]);

  const handleSend = () => {
    if (messageInput.trim() && socketRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: "chat_message",
        message: messageInput,
        sender_id: user.id,
        sender_name: `${user.first_name} ${user.last_name}`,
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessageInput("");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <h6 className="fw-bold mb-2">📚 Subjects</h6>
          {loading && <Spinner animation="border" size="sm" />}
          <ListGroup className="mb-3">
            {subjects.map((subj) => (
              <ListGroup.Item
                key={subj.id}
                active={subj.id === selectedSubject}
                action
                onClick={() => {
                  setSelectedSubject(subj.id);
                  setSelectedUser(null);
                  setMessages([]);
                  fetchParticipants(subj.id);
                }}
              >
                {subj.name}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {selectedSubject && (
            <>
              <h6 className="fw-bold mb-2">
                {isStudent ? "👨‍🏫 Teachers" : "👩‍🎓 Students"}
              </h6>
              <ListGroup>
                {participants.map((p) => (
                  <ListGroup.Item
                    key={p.id}
                    active={selectedUser?.id === p.id}
                    action
                    onClick={() => {
                      setSelectedUser(p);
                      setMessages([]);
                    }}
                  >
                    {p.name || `${p.first_name} ${p.last_name}`}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </div>

        {/* Chat Area */}
        <div className="col-md-9 d-flex flex-column">
          <Card className="flex-grow-1 d-flex flex-column">
            <Card.Header>
              {selectedUser ? (
                <div>
                  Chat with <strong>{selectedUser.name || `${selectedUser.first_name} ${selectedUser.last_name}`}</strong>
                </div>
              ) : (
                "Select a subject and user to start chatting"
              )}
            </Card.Header>

            <Card.Body className="flex-grow-1 overflow-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{msg.sender_name}:</strong> {msg.message}
                </div>
              ))}
            </Card.Body>

            {selectedUser && (
              <Card.Footer>
                <Form className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button onClick={handleSend}>Send</Button>
                </Form>
              </Card.Footer>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
