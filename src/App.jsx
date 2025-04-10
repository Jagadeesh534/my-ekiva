import { useState } from "react";
import "./App.css";
import Landing from "./app/components/Landing";
import { Route, Routes } from "react-router-dom";
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
import SmartClassroomChat from "./app/components/SmartClassroomChat";
import SubjectListPage from "./app/components/school/subjects/SubjectListPage";
import Classes from "./app/components/school/Classes/Classes";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import TeacherListPage from "./app/components/teachers/TeacherListPage";
import TeacherAssignmentPage from "./app/components/teachers/TeacherAssignmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const loginType = useSelector((state) => state.auth.loginType);

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout title="Dashboard" />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Students */}
          <Route path="students" element={<StudentsList title="Students" />} />
          <Route
            path="students/register"
            element={<StudentRegister title="Register" />}
          />
          <Route
            path="students/edit"
            element={<StudentEdit />}
          />
          <Route
            path="students/view"
            element={<StudentView />}
          />

          {/* Subjects */}
          <Route
            path="subjects"
            element={<SubjectListPage title="Subjects" />}
          />

          {/* Content Review */}
          <Route path="contents">
            <Route index element={<Contents title="Contents" />} />
            <Route path="class">
              <Route index element={<Subjects title="Subjects" />} />
              <Route path="topics" element={<Topics title="Topics" />} />
            </Route>
          </Route>

          {/* Classes */}
          <Route path="class">
            <Route index element={<Classes title="Classes" />} />
            <Route
              path="section/students"
              element={<StudentsList title="Students" />}
            />
          </Route>
{/* Teachers */}
<Route path="teachers">
  <Route index element={<TeacherListPage title="Teachers" />} />
  <Route path="assign" element={<TeacherAssignmentPage title="Assign Teacher" />} />
</Route>


          {/* Profile & Smart Classroom */}
          <Route
            path="profile-school"
            element={<EditSchool title="Edit" />}
          />
          <Route
            path="smart-class"
            element={<SmartClassroomChat role={loginType} />}
          />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
