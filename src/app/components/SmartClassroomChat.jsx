import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Button,
  ListGroup,
  Card,
  Spinner,
  Badge,
  Nav,
  Tab,
} from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import config from "../config";
import { FaPaperclip } from "react-icons/fa";

const ChatPage = () => {
  const loginType = useSelector((state) => state.auth.loginType);
  const user = useSelector((state) => state.auth.userInfo);
  const school = useSelector((state) => state.auth.school);
  const isStudent = loginType === "student";

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myMessages, setMyMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const getChatroomId = (otherUserId) => [user.id, otherUserId].sort().join("-");
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const fetchSubjects = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${config.API_BASE}subjects?school_id=${school.id}`);
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  }, [school.id]);

  const fetchClasses = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${config.API_BASE}classrooms/`);
      setClasses(res.data);
      console.log("Classes:", res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  }, []);
  useEffect(() => {
    if (!isStudent && selectedClass && selectedSection) {
      fetchParticipants();
    } else {
      fetchParticipants();
    }
  }, [selectedClass, selectedSection,selectedSubject]);
  const fetchParticipants = async () => {
    try {
      console.log("Fetching participants...");
      console.log('Selected Subject:', selectedSubject);
      console.log('Selected Class:', selectedClass);
      console.log('Selected Section:', selectedSection);
      let endpoint = "";
      if (isStudent && selectedSubject) {
        endpoint = `${config.API_BASE}subjects/${selectedSubject}/details/`;
      } else if (!isStudent && selectedClass && selectedSection) {
        endpoint = `${config.API_BASE}students?classroom_id=${selectedClass}&section_id=${selectedSection}`;
      }
      const res = await axiosInstance.get(endpoint);
      if((!isStudent && Array.isArray(res.data)) || (isStudent && Array.isArray(res.data.teachers))) {
      setParticipants(isStudent ? res.data.teachers : res.data);
      } else {
        setParticipants([]);
      }
      console.log("Participants:", res.data);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching participants:", err);
    }
  };

  useEffect(() => {
    if (isStudent) fetchSubjects();
    else fetchClasses();
  }, [fetchSubjects, fetchClasses]);

  useEffect(() => {
    if (!selectedUser) return;
    const chatroomId = getChatroomId(selectedUser.id);
    socketRef.current = new WebSocket(`${config.WEBSOCKET_BASE}/${chatroomId}/`);

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
      if (!myMessages.find((u) => u.id === data.sender_id)) {
        setMyMessages((prev) => [...prev, { id: data.sender_id, name: data.sender_name }]);
      }
    };

    socketRef.current.onclose = () => console.log("WebSocket closed");
    return () => socketRef.current?.close();
  }, [selectedUser]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!messageInput.trim() && !attachment) return;
    if (socketRef.current.readyState !== WebSocket.OPEN) return;

    const payload = {
      type: "chat_message",
      message: messageInput.trim(),
      sender_id: user.id,
      sender_name: `${user.first_name} ${user.last_name}`,
      receiver_id: selectedUser.id,
      attachment: attachment ? URL.createObjectURL(attachment) : null,
      attachment_name: attachment?.name || null,
    };

    socketRef.current.send(JSON.stringify(payload));
    setMessageInput("");
    setAttachment(null);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row flex-grow-1 h-100 overflow-hidden">
        {/* Sidebar Tabs */}
        <Tab.Container defaultActiveKey="subjects">
          <div className="col-md-3 border-end py-3 bg-light overflow-auto">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="subjects">{isStudent ? "Subjects" : "Classes"}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages">My Messages</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="subjects">
                {isStudent ? (
                  <ListGroup>
                    {subjects.map((s) => (
                      <ListGroup.Item
                        key={s.id}
                        active={s.id === selectedSubject}
                        action
                        onClick={() => {
                          setSelectedSubject(s.id);
                          setSelectedUser(null);
                          setMessages([]);
                        }}
                      >
                        {s.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <>
                    <Form.Select
                      className="mb-2"
                      value={selectedClass || ""}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        setSelectedSection(null);
                      }}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </Form.Select>
                    {selectedClass && (
                      <Form.Select
                      value={selectedSection || ""}
                        className="mb-2"
                        onChange={(e) => {
                          debugger
                          setSelectedSection(e.target.value);
                          console.log("Selected Section:", selectedSection);
                          setSelectedUser(null);
                          setMessages([]);
                        }}
                      >
                        <option value="">Select Section</option>
                        {classes.find((c) => c.id == selectedClass)?.sections?.map((sec) => (
                          <option key={sec.id} value={sec.id}>{sec.name}</option>
                        ))}
                      </Form.Select>
                    )}
                  </>
                )}

                {/* Participants */}
                <hr className="my-3" />
                <h6 className="fw-bold">
                  {isStudent ? "Teachers" : "Students"}
                </h6>
                <ListGroup>
                  {participants?.map((p) => (
                  isStudent ?  <ListGroup.Item
                      key={p.id}
                      active={selectedUser?.id === p.id}
                      action
                      onClick={() => {
                        setSelectedUser(p);
                        setMessages([]);
                      }}
                    >
                      {p.name || `${p.first_name} ${p.last_name}`}
                    </ListGroup.Item> : 
                    <ListGroup.Item
                      key={p.user.id}
                      active={selectedUser?.id === p.user.id}
                      action
                      onClick={() => {
                        setSelectedUser(p.user);
                        setMessages([]);
                      }}
                    >
                      {p.user.first_name} {p.user.last_name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>

              <Tab.Pane eventKey="messages">
                <ListGroup>
                  {myMessages.map((msgUser) => (
                    <ListGroup.Item
                      key={msgUser.id}
                      active={selectedUser?.id === msgUser.id}
                      action
                      onClick={() => {
                        setSelectedUser(msgUser);
                        setMessages([]);
                      }}
                    >
                      {msgUser.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>

        {/* Chat Area */}
        <div className="col-md-9 d-flex flex-column p-0 h-100">
          <Card className="flex-grow-1 d-flex flex-column h-100">
            <Card.Header>
              {selectedUser ? (
                <div>
                  Chat with <strong>{selectedUser.name || `${selectedUser.first_name} ${selectedUser.last_name}`}</strong>
                </div>
              ) : (
                "Select a participant to start chatting"
              )}
            </Card.Header>

            <Card.Body className="flex-grow-1 overflow-auto px-4 py-3">
              {messages.map((msg, idx) => {
                const isOwn = msg.sender_id === user.id;
                return (
                  <div
                    key={idx}
                    className={`mb-3 d-flex ${isOwn ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div
                      className={`p-3 rounded shadow-sm ${isOwn ? "bg-primary text-white" : "bg-light border"}`}
                      style={{ maxWidth: "75%" }}
                    >
                      <div className="small fw-semibold mb-2">{isOwn ? "You" : msg.sender_name}</div>
                      {msg.message && <div>{msg.message}</div>}
                      {msg.attachment && (
                        <div className="mt-2">
                          📎 <a
                            href={msg.attachment}
                            download={msg.attachment_name}
                            target="_blank"
                            rel="noreferrer"
                            className={isOwn ? "text-white" : "text-primary"}
                          >
                            {msg.attachment_name || "View File"}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </Card.Body>

            {/* Chat Input */}
            {selectedUser && (
              <Card.Footer className="bg-white">
                <Form
                  className="d-flex gap-2 align-items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <label className="btn btn-outline-secondary mb-0" title="Attach File">
                    <FaPaperclip />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setAttachment(e.target.files[0])}
                    />
                  </label>

                  {attachment && (
                    <Badge bg="info" className="text-truncate" style={{ maxWidth: "150px" }}>
                      {attachment.name}
                    </Badge>
                  )}

                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />

                  <Button type="submit">Send</Button>
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
