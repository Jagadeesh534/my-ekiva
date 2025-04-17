import React from "react";
import StudentGrid from "../../components/students/StudentGrid";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents
} from "../../features/studentSlice";
import axiosInstance from "../../axiosInstance";
import config from "../../config";

const StudentsList = () => {
    const dispatch = useDispatch();
    const [students,setStudents] = useState([]);
   const selectedClass = useSelector((state) => state.student.selectedClassObj);
  useEffect(() => {
   
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(config.API_BASE + "students?classroom_id=" + selectedClass.classId + "&section_id=" + selectedClass.section.id);
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
