import React, { useState, useEffect } from "react";
import "./ResultTeacher.css";
import ResultTableTeacherRed from "./ResultTableTeacherRed";
import axios from "axios";
import Swal from "sweetalert2";



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

  ],
];

function ResultTeacher() {

  const [schedule, setSchedule] = useState([]);
  const name = sessionStorage.getItem("name")

  const [myyear2, setYear2] = useState("");
  const [termsearch, setTerm] = useState("");
  const [courses2, setCourses2] = useState([]);


  const search2 = () => {
    if (myyear2 === "" || termsearch === "") {
      // ถ้า myyear2 หรือ termsearch ว่าง ให้แสดงข้อความแจ้งเตือนและไม่ทำอะไรเพิ่ม
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกปีการศึกษาและเทอม",
        customClass: {
          popup: 'kanit-font',
          header: 'kanit-font',
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          footer: 'kanit-font'
        }
      });
    } else {
      // ถ้า myyear2 และ termsearch ไม่ว่าง ให้ส่ง request ไปยัง API ตามปีการศึกษาและเทอมที่เลือก
      axios.get(`http://127.0.0.1:3001/registall-data?myyear2=${myyear2}&termsearch=${termsearch}`) // ส่งค่า myyear2 และ termsearch ผ่าน query string
        .then((response) => {
          setCourses2(response.data);
          console.log("เปิดสอน" + myyear2 + "เทอม" + termsearch); // แสดงปีการศึกษาและเทอมที่เลือก
          fetchData();
          
        } ,[myyear2, termsearch])
        .catch((error) => {
          console.error('Error fetching course data:', error);
        });
    }
  };
  
  
  
  

  // Define the formatTime function above its first use
  const formatTime = (time) => {
    // Assuming the time is a time string in 'HH:mm:ss' format
    // Ensure time is in 'HH:MM' format for comparison with timeSlots
    return time.substring(0, 5);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/registall-data?myyear2=${myyear2}&termsearch=${termsearch}`);
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
        const response = await axios.get(`http://127.0.0.1:3001/registall-data?myyear2=${myyear2}&termsearch=${termsearch}`);
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

    
  }); // ให้ useEffect รันเมื่อ myyear2 หรือ termsearch เปลี่ยนแปลง



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
          <div >
            <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ปีการศึกษา</p>
            <select value={myyear2} onChange={(e) => { setYear2(e.target.value) }}>
              <option value=""></option>
              <option value="2569">2569</option>
              <option value="2568">2568</option>
              <option value="2567">2567</option>
              <option value="2566">2566</option>
              <option value="2565">2565</option>
              <option value="2564">2564</option>
              <option value="2563">2563</option>
              <option value="2562">2562</option>
              <option value="2561">2561</option>
              <option value="2560">2560</option>
              <option value="2559">2559</option>
              <option value="2558">2558</option>
              <option value="2557">2557</option>
              <option value="2556">2556</option>
              <option value="2555">2555</option>
            </select>
          </div>

          <div style={{ marginLeft: '25%', marginTop: '-86px' }}>
            <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ภาคเรียน</p>
            <select value={termsearch} onChange={(e) => { setTerm(e.target.value) }}>
              <option value=""></option>
              <option value="ภาคต้น">ภาคต้น</option>
              <option value="ภาคปลาย">ภาคปลาย</option>



            </select>
            <div style={{ marginLeft: '80px', marginTop: '-30px' }}>
              <button onClick={() => { search2() }} className='CheckboxOpenCourse-button' style={{ backgroundColor: '#8C3941' }} >ค้นหา</button>
            </div>
          </div>

          <p className="ResultTeacher-texthead" style={{ marginTop: '30px' }}>
            ตารางสอนของ อาจารย์  : {" "}
            <span className="ResultTeacher-nametext" style={{ color: 'black' }}>{name}</span>
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
