import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, ListGroup, Card } from "react-bootstrap";
import axiosInstance from "../axiosInstance";

const WEBSOCKET_BASE = "wss://yourdomain/ws/chat"; // replace with your domain
const API_BASE = "https://92de-2409-40f0-11cd-308d-b6f5-64dd-bd65-3bb6.ngrok-free.app/api";


const ChatPage = () => {
  const loginType = useSelector((state) => state.auth.loginType); // "student" or "teacher"
  const user = useSelector((state) => state.auth.userInfo); // Assume user has { id, name }
  const school = useSelector((state) => state.auth.school);

  const isStudent = loginType === "student";
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef(null);
  const [loading,setLoading] = useState(false);
  const [subjects,setSubjects] = useState([]);
  const getChatroomId = (otherUserId) =>
    [user.id, otherUserId].sort().join("-");
  const [teachers,setTeachers] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      const chatroomId = getChatroomId(selectedUser.id);
      socketRef.current = new WebSocket(`${WEBSOCKET_BASE}/${chatroomId}/`);

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      };

      socketRef.current.onclose = () => console.log("WebSocket closed");
      return () => socketRef.current.close();
    }
  }, [selectedUser]);
  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_BASE}/subjects?school_id=${school.id}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  }, [school.id]);
  useEffect(()=>{
    fetchSubjects();
  },[])

  const handleSend = () => {
    if (messageInput.trim() && socketRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: "chat_message",
        message: messageInput,
        sender_id: user.id,
        sender_name: user.name,
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessageInput("");
    }
  };

  

   const getTeachers = async (subjectId)=>{
      if (!subjectId) return;
      setTeachers([]);
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${API_BASE}/subjects/${subjectId}/details/`
        );
        setTeachers(response.data.teachers);
        setLoading(false);
      } catch(err){
        console.log("Error in loading teachers : =>", err);
        setLoading(false);

      }

   }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Panel */}
        <div className="col-md-3">
          <h6 className="fw-bold mb-2">📚 Subjects</h6>
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
                  getTeachers(subj.id);
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
                {teachers.map((u) => (
                  <ListGroup.Item
                    key={u.id}
                    active={selectedUser?.id === u.id}
                    action
                    onClick={() => {
                      setSelectedUser(u);
                      setMessages([]);
                    }}
                  >
                    {u.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className="col-md-9 d-flex flex-column">
          <Card className="flex-grow-1 d-flex flex-column">
            <Card.Header>
              {selectedUser ? (
                <div>
                  Chat with{" "}
                  <strong>
                    {selectedUser.name} ({selectedSubject})
                  </strong>
                </div>
              ) : (
                "Select a user to start chatting"
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
