import React, { useState, useEffect } from "react";
import './ResultTeacher.css';
import ResultTableTeacherRed from './ResultTableTeacherRed';
import axios from "axios";

// Define the days of the week
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Define the time slots
const timeSlots = [
    "7:00-7:30", "7:30-8:00", "8:00-8:30", "8:30-9:00", "9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00", "11:00-11:30",
    "11:30-12:00", "12:00-12:30", "12:30-13:00", "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00", "16:00-16:30",
    "16:30-17:00", "17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00", "19:00-19:30", "19:30-20:00", "20:00-20:30", "20:30-21:00"
];

// Data for the table (excluding the first column and row)
const data = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
];

function ResultTeacher() {
  // State to hold the fetched schedule data
  const [schedule, setSchedule] = useState([]);

  const name = sessionStorage.getItem("name")

  // Fetch data from your API
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3001/schedule');
              setSchedule(response.data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
  }, []);

  // Function to find and return course details for a given day and time slot
  const getCourseDetailsForTimeSlot = (day, time) => {
    // Assuming your schedule is an array of course objects with properties 'day' and 'time'
    const courseDetail = schedule.find(course =>
      course.day === day && course.time === time
    );
    return courseDetail ? `${courseDetail.sbj_name} (${courseDetail.time})` : "";
  };

    return (

        <div>
        <div className="table-container">
          <div>
            <p className="ResultTeacher-texthead">
              ตารางสอนของ อาจารย์: <span className="ResultTeacher-nametext">{name}</span>
            </p>
          </div>
  
          <table>
            <thead>
              <tr>
                <th></th> {/* Empty cell for spacing */}
                {timeSlots.map((timeSlot, index) => (
                  <th key={index}>{timeSlot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{day}</td>
                  {timeSlots.map((time, colIndex) => {
                    // Call getCourseDetailsForTimeSlot and render its return value inside the cell
                    const courseDetails = getCourseDetailsForTimeSlot(day, time);
                    return (
                      <td key={`${rowIndex}-${colIndex}`}>
                        {courseDetails}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ResultTableTeacherRed-left">
          <ResultTableTeacherRed></ResultTableTeacherRed>
        </div>
      </div>

    );
}

export default ResultTeacher;
