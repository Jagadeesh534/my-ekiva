import { useState } from "react";
import "./App.css";
import Landing from "./app/components/Landing";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./app/components/Login";
import Dashboard from "./app/components/Dashboard";
import Layout from "./app/components/Layout";
import NotFound from "./app/components/NotFound";
import StudentsList from "./app/components/students/StudentList";
import StudentRegister from "./app/components/students/StudentRegister";
import StudentEdit from "./app/components/students/StudentEdit";
import StudentView from "./app/components/students/StudentView";
import EditSchool from "./app/components/school/EditSchool";
import Contents from "./app/components/school/review/Contents";
import Subjects from "./app/components/school/review/Subjects";
import Topics from "./app/components/school/review/Topics";
import StudentHome from "./app/components/students/StudentHome";
import SmartClassroomChat from "./app/components/SmartClassroomChat";
import { useSelector } from "react-redux";
import SubjectListPage from "./app/components/school/subjects/SubjectListPage";
import SubjectCreatePage from "./app/components/school/subjects/SubjectCreatePage";
import SubjectEditPage from "./app/components/school/subjects/SubjectEditPage";
import Classes from "./app/components/school/Classes/Classes";

function App() {
  const loginType = useSelector((state) => state.auth.loginType);
  const students = [
    {
      id: 1,
      name: "John Doe",
      className: "10th Grade",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      className: "9th Grade",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Sam Wilson",
      className: "12th Grade",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Emma Watson",
      className: "8th Grade",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Chris Evans",
      className: "11th Grade",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Natasha Romanoff",
      className: "10th Grade",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Bruce Wayne",
      className: "9th Grade",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Tony Stark",
      className: "12th Grade",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
  ];
  const classes = [
    {
      id: 1,
      name: "Class 6",
      sections: ["A", "B", "C"],
    },
    {
      id: 2,
      name: "Class 7",
      sections: ["A", "B"],
    },
  ];
  
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes with Layout */}
        <Route path="/dashboard" element={<Layout title="Dashboard" />}>
          <Route index element={<Dashboard />} />
          {/* studnts view starts */}
          <Route path="students" element={<StudentsList title="studnets" />} />
          <Route
            path="students/register"
            element={<StudentRegister title="register" />}
          />
          <Route
            path="students/edit/:id"
            element={<StudentEdit students={students} />}
            title="edit"
          />
          <Route
            path="students/view/:id"
            element={<StudentView students={students} />}
            title="view"
          />
          {/* studnts view ends */}

          <Route path="subjects" element={<SubjectListPage title="Subjects"/>} />
          <Route path="subjects/create" element={<SubjectCreatePage title="Create Subject"/>} />
          <Route path="subjects/edit/:id" element={<SubjectEditPage title="Edit Subject"/>} />

          {/* Content Review Routes */}
          <Route path="contents">
            <Route index element={<Contents title="Contents" />} />
            <Route path="class/:classId">
              <Route index element={<Subjects title="Subjects" />} />
              <Route
                path=":subjectId/topics"
                element={<Topics title="Topics" />}
              />
            </Route>
          </Route>
          <Route path="class" >
            <Route index element={<Classes title="Classes"  />} />
          </Route>

          <Route
            path="profile-school"
            element={<EditSchool title="edit"></EditSchool>}
          ></Route>
          <Route
            path="smart-class"
            element={<SmartClassroomChat role={loginType}></SmartClassroomChat>}
          ></Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
