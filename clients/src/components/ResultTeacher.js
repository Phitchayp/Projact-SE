import React, { useState, useEffect } from "react";
import "./ResultTeacher.css";
import ResultTableTeacherRed from "./ResultTableTeacherRed";
import axios from "axios";


// Define the days of the week
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


// Define the time slots
const timeSlots = [
  "07:00-07:30",
  "07:30-08:00",
  "08:00-08:30",
  "08:30-09:00",
  "09:00-09:30",
  "09:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-13:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
  "17:30-18:00",
  "18:00-18:30",
  "18:30-19:00",
  "19:00-19:30",
  "19:30-20:00",
  "20:00-20:30",
  "20:30-21:00",
];

// Data for the table (excluding the first column and row)
const data = [
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
];

function ResultTeacher() {
  
    const [schedule, setSchedule] = useState([]);
    const name = sessionStorage.getItem("name")
  
    // Define the formatTime function above its first use
    const formatTime = (time) => {
      // Assuming the time is a time string in 'HH:mm:ss' format
      // Ensure time is in 'HH:MM' format for comparison with timeSlots
      return time.substring(0, 5);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/registall-data");
        // Use the formatTime function here to map over and format your data
        const formattedSchedule = response.data.map(course => ({
          ...course,
          time_start: formatTime(course.time_start),
          time_end: formatTime(course.time_end),
        }));
        console.log('Formatted schedule:', formattedSchedule);
        setSchedule(formattedSchedule);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/registall-data");
          // Use the formatTime function here to map over and format your data
          const formattedSchedule = response.data.map(course => ({
            ...course,
            time_start: formatTime(course.time_start),
            time_end: formatTime(course.time_end),
          }));
          console.log('Formatted schedule:', formattedSchedule);
          setSchedule(formattedSchedule);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
  
  


  // ...later in your component, before the return statement
  console.log(schedule); // Check that state is updated
  

  const calculateSpan = (startTime, endTime) => {
    // Converts time in "HH:MM" format to the number of half-hour slots since 7:00 AM
    const convertToHalfHourSlots = (time) => {
      // Strip leading zeros and convert to 24-hour time format if necessary
      const [hours, minutes] = time.replace(/^0+/, '').split(':').map(Number);
      return (hours - 7) * 2 + (minutes / 30);
    };
  
    return convertToHalfHourSlots(endTime) - convertToHalfHourSlots(startTime);
  };
  
  const getCourseDetailsForDay = (day) => {
    const dayCourses = schedule
      .filter((course) => course.day === day)
      .map((course) => {
        const span = calculateSpan(course.time_start, course.time_end);
        const startSlot = timeSlots.findIndex(slot => slot.startsWith(course.time_start));
        console.log(`Course: ${course.name}, Day: ${day}, StartSlot: ${startSlot}, Span: ${span}`);
        return {
          ...course,
          span: span,
          startSlot: startSlot,
        };
      });
  
    if (dayCourses.length === 0) {
      console.log(`No courses found for ${day}`);
    }
    
    return dayCourses;
  };
  
  
  

  return (
    <div>
      <div className="table-container">
        <div>
          <p className="ResultTeacher-texthead">
            ตารางสอนของ อาจารย์:{" "}
            <span className="ResultTeacher-nametext">{name}</span>
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
        {timeSlots.map((_, colIndex) => {
          const dayCourses = getCourseDetailsForDay(day);
          const course = dayCourses.find(c => colIndex === c.startSlot);
          if (course && colIndex === course.startSlot) {
            // Add a class 'subject-cell' to the cell that will have a subject
            return (
              <td key={`${rowIndex}-${colIndex}`} colSpan={course.span} className="subject-cell">
                {course.name} 
                <br />
                {course.idsubject}
              </td>
            );
          } else if (!dayCourses.some(c => colIndex >= c.startSlot && colIndex < c.startSlot + c.span)) {
            // If the cell should be empty (not spanning from a previous subject cell)
            return <td key={`${rowIndex}-${colIndex}`}></td>;
          }
          return null; // This line ensures that cells that are part of a span are not re-rendered
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
