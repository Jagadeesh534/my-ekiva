import React from "react";
import StudentGrid from "../../components/students/StudentGrid";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents
} from "../../features/studentSlice";
import axiosInstance from "../../axiosInstance";

const API_BASE = "https://92de-2409-40f0-11cd-308d-b6f5-64dd-bd65-3bb6.ngrok-free.app/api/"; // Use your real API
const StudentsList = () => {
    const dispatch = useDispatch();
    const [students,setStudents] = useState([]);
   const selectedClass = useSelector((state) => state.student.selectedClassObj);
  useEffect(() => {
   
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(API_BASE + "students?classroom_id=" + selectedClass.classId + "&section_id=" + selectedClass.section.id);
        console.log("Fetched students data:", response);
        setStudents(response.data); 
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudents();

  }, [dispatch]);

  return (
    <div>
      <StudentGrid students={students} />
    </div>
  );
};

export default StudentsList;
