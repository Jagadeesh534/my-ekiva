import React from "react";
import StudentGrid from "../../components/students/StudentGrid";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents
} from "../../features/studentSlice";
const StudentsList = () => {
    const dispatch = useDispatch();
    const students = [
        {
          id: 1,
          rollNumber: 'LA1',
          name: "John Doe",
          className: "10th Grade",
          status: "Active",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: 2,
          rollNumber: 'LA2',
          name: "Jane Smith",
          className: "9th Grade",
          status: "Inactive",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: 3,
          rollNumber: 'LA3',
          name: "Sam Wilson",
          className: "12th Grade",
          status: "Active",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          id: 4,
          rollNumber: 'LA4',
          name: "Emma Watson",
          className: "8th Grade",
          status: "Active",
          avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
          id: 5,
          rollNumber: 'LA5',
          name: "Chris Evans",
          className: "11th Grade",
          status: "Inactive",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
          id: 6,
          rollNumber: 'LA6',
          name: "Natasha Romanoff",
          className: "10th Grade",
          status: "Active",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
          id: 7,
          rollNumber: 'LA7',
          name: "Bruce Wayne",
          className: "9th Grade",
          status: "Active",
          avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
          id: 8,
          rollNumber: 'LA8',
          name: "Tony Stark",
          className: "12th Grade",
          status: "Inactive",
          avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
      ];
      // Fetch Sample Students (or API data)
  useEffect(() => {
    dispatch(fetchStudents(students)); // Replace with API call if needed
  }, [dispatch]);

  return (
    <div>
      <StudentGrid students={students} />
    </div>
  );
};

export default StudentsList;
