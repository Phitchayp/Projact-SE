import React, { useState } from "react";
import "./testtable.css"; // Import CSS file for table styling
import MyImage from "../assets/Vector.png";
// import RegisResultTable from './RegisResultTable';
import InputNumNisit from "./compoRegisCourse";
import TimePickerTa from "./Timepicker";
import CheckBoxRe from "./Checkbox";
import TestTableDropdown from "./roomfromdb";
import Axios from "axios";
import RegisResultTable from "./RegisResultTable";

class RegisTa extends React.Component {
  state = {
    registrationData: [],
    courseSections: [], // Array to hold the number of sections for each course
    lectureCourses: [], // ข้อมูลภาคบรรยาย
    practicalCourses: [], // ข้อมูลภาคปฏิบัติ
  };

  componentDidMount() {
    this.fetchCourseSections();

  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      // Make sure the URLs match your server's endpoints
      const practicalResponse = await Axios.get(
        "http://localhost:3001/lab-courses"
      );
      const lectureResponse = await Axios.get(
        "http://localhost:3001/lecture-courses"
      );
      const registrationData = await Axios.get(
        "http://localhost:3001/registration-data"
      );
      const resultsResponse = await Axios.get(
        "http://localhost:3001/result-data"
      );

      this.setState({
        registrationData:registrationData.data,
        practicalCourses: practicalResponse.data, // Data for 'ภาคปฏิบัติ'
        lectureData: lectureResponse.data, // Data for 'ภาคบรรยาย' or lecture courses
        

      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Handle the error here. You could set state to display an error message or retry the fetch.
    }
  };

  componentDidMount() {
    this.fetchCourses();
  }
  fetchCourses = async () => {
    try {
      // สมมติมี endpoint แยกสำหรับภาคบรรยายและภาคปฏิบัติ
      const registrationData=await Axios.get("http://localhost:3001/registration-data");
      const lectureResponse = await Axios.get("http://localhost:3001/lecture-courses");
      const practicalResponse = await Axios.get("http://localhost:3001/lab-courses");
      this.setState({
        registrationData:registrationData.data,
        lectureCourses: lectureResponse.data,
        practicalCourses: practicalResponse.data,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  renderTableRows = () => {
    return this.state.courseSections.map((section, index) => (
      <tr key={index}>
        {/* Your other table cells */}
        <td>{section.section}</td>
        
        {/* More table cells based on the section data */}
      </tr>
    ));
  };

  // fetchLectureData = async () => {
  //   try {
  //     const response = await Axios.get("http://localhost:3001/lecture-courses"); // Your backend endpoint
  //     this.setState({ lectureData: response.data });
  //   } catch (error) {
  //     console.error("Failed to fetch lecture data:", error);
  //     // Handle error here
  //   }
  // };

  // fetchLabData = async () => {
  //   try {
  //     const response = await Axios.get("http://localhost:3001/practical-courses"); // Your backend endpoint
  //     this.setState({ practicalCourse: response.data });
  //   } catch (error) {
  //     console.error("Failed to fetch practicalCourse data:", error);
  //     // Handle error here
  //   }
  // };
  handleDeleteRow = (courseId) => {
    Axios.delete(`http://localhost:3001/delete-course/${courseId}`)
      .then(response => {
        // Handle the successful deletion
        console.log(response.data);
        // Refresh the data in your component or remove the row from the state
        this.setState(prevState => ({
          lectureCourses: prevState.lectureCourses.filter(course => course.id !== courseId),
          practicalCourses: prevState.practicalCourses.filter(course => course.id !== courseId),
        }));
      })
      .catch(error => {
        // Handle the error case
        console.error('There was an error!', error);
      });
  };
  handleDeleteRow1 = (courseId) => {
    Axios.delete(`http://localhost:3001/delete-courset/${courseId}`)
      .then(response => {
        // Handle the successful deletion
        console.log(response.data);
        // Refresh the data in your component or remove the row from the state
        this.setState(prevState => ({
          registrationData:prevState.registrationData.filter(course => course.id !== courseId),
        }));
      })
      .catch(error => {
        // Handle the error case
        console.error('There was an error!', error);
      });
  };



  renderCoursesLec = (courses) => {

    return courses.flatMap((course, index) => (
      Array.from({ length: course.section }, (_, sectionIndex) => {
        const key = `${index}-${sectionIndex}`; 
        return (
          <tr key={key}>
            <td>
              <div className="testtable-image-container">
                <img
                  src={MyImage}
                  alt="Delete"
                  className="testtable-centered-image"
                  onClick={() => this.handleDeleteRow(course.id)}
                />
              </div>
            </td>
            <td>{course.years}</td> {/* Display the year data here */}
            <td>{course.subject_id}</td>
            <td>{course.subject_name}</td>
            <td>{course.credit}</td>
            <td>1</td> 
            <td>{course.sec_num}</td> {/* แสดงผลรวมของ 800 และค่า index และ sectionIndex */}
            <td>
              <div className="testtable-inputNumNisit">
                <InputNumNisit></InputNumNisit>
              </div>
            </td>
            <td>
              {course.branch}
              <div>
                <CheckBoxRe />
              </div>
            </td>
            <td>
              <div className="testtable-dropdownposition">
                <select className="testtable-dropdown">
                  {/* 2. Dropdown เลือกวัน */}
                  <option value=""></option>
                  <option value="Monday">Mon</option>
                  <option value="Tuesday">Tue</option>
                  <option value="Wednesday">Wed</option>
                  <option value="Thursday">Thu</option>
                  <option value="Friday">Fri</option>
                  <option value="Friday">Sat</option>
                  <option value="Friday">Sun</option>
                </select>
              </div>
            </td>
            <td>
              <div>
                <div>
                  <TimePickerTa />
                </div>
              </div>
            </td>
            <td> </td>
          </tr>
        );
      })
    ));
  };
  

  renderCoursesPrac = (courses) => {
    return courses.flatMap((course, index) => (
      Array.from({ length: course.section }, (_, sectionIndex) => {
        const key = `${index}-${sectionIndex}`; // สร้าง key จากการรวม index และ sectionIndex
        return(
          <tr key={key}>
            <td>
              <div className="testtable-image-container">
                <img
                  src={MyImage}
                  alt="Delete"
                  className="testtable-centered-image"
                  onClick={() => this.handleDeleteRow(course.id)}
                />
              </div>
            </td>
            <td>{course.years}</td> {/* Display the year data here */}
            <td>{course.subject_id}</td>
            <td>{course.subject_name}</td>
            <td>{course.credit}</td>
            <td>1</td>
            <td>{course.sec_num}</td>
            <td>
              <div className="testtable-inputNumNisit">
                <InputNumNisit></InputNumNisit>
              </div>
            </td>
            <td>
              {course.branch}
              <div>
                <CheckBoxRe />
              </div>
            </td>
            <td>
              <div className="testtable-dropdownposition">
                <select className="testtable-dropdown">
                  {/* 2. Dropdown เลือกวัน */}
                  <option value=""></option>
                  <option value="Monday">Mon</option>
                  <option value="Tuesday">Tue</option>
                  <option value="Wednesday">Wed</option>
                  <option value="Thursday">Thu</option>
                  <option value="Friday">Fri</option>
                  <option value="Friday">Sat</option>
                  <option value="Friday">Sun</option>
                </select>
              </div>
            </td>
            <td>
              <div>
                <div>
                  <TimePickerTa />
                </div>
              </div>
            </td>
            <td>
              <div className="testtable-dropdownposition">
                <TestTableDropdown />
              </div>
            </td>
            <td> </td>
          </tr>
        ); 
     })
    ));
  };

  // handleDeleteRow = (event) => {
  //   // รับค่า index ของแถวที่คลิกที่ภาพ
  //   const rowIndex = event.target.parentNode.parentNode.rowIndex;
  //   // ลบแถวออกจากตาราง
  //   if(rowIndex !== 0) { // ไม่ให้ลบแถวแรก (หัวตาราง)
  //     document.querySelector('.bordered-table').deleteRow(rowIndex);
  //   }
  // }
  handleSaveButtonLec = async () => {
    try {
      // ดึงข้อมูลจาก lectureCourses
      const coursesData = this.state.lectureCourses.map(course => ({
        years: course.years,
        subject_id: course.subject_id,
        subject_name: course.subject_name,
        credit: course.credit,
       
      }));
  
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      const response = await Axios.post("URL_TO_YOUR_API_ENDPOINT", coursesData);
  
      // ดำเนินการต่อเมื่อบันทึกสำเร็จ
      console.log("บันทึกข้อมูลสำเร็จ:", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
     
    }
    // console.log(selectedDay);
  };
  
  handleSaveButtonLab = async () => {
    try {
      // ดึงข้อมูลจาก practicalCourses
      const coursesData = this.state.practicalCourses.map(course => ({
        years: course.years,
        subject_id: course.subject_id,
        subject_name: course.subject_name,
        credit: course.credit,
        // รายละเอียดอื่น ๆ ที่ต้องการบันทึก
      }));
  
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      const response = await Axios.post("URL_TO_YOUR_API_ENDPOINT", coursesData);
  
      // ดำเนินการต่อเมื่อบันทึกสำเร็จ
      console.log("บันทึกข้อมูลสำเร็จ:", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
      // จัดการข้อผิดพลาดที่นี่
    }
  };
  
  render() {
    const { registrationData } = this.state;
    const { lectureCourses, practicalCourses } = this.state;

    document.addEventListener("DOMContentLoaded", function () {
      // เพิ่มโค้ดที่ต้องการให้ทำงานหลังจากการโหลดหน้าเว็บเสร็จสมบูรณ์ที่นี่
      var saveButtonLab = document.getElementById("saveButton");
      var saveButtonLec = document.getElementById("saveButton");
      var saveButtonSavecourse = document.getElementById("saveButton");

      if (saveButtonLab) {
        saveButtonLab.addEventListener("click", function () {
          console.log("คุณกำลังคลิกปุ่มบันทึก");
          // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
        });
      }

      if (saveButtonLec) {
        saveButtonLec.addEventListener("click", function () {
          console.log("คุณกำลังคลิกปุ่มบันทึก");
          // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
        });
      }

      if (saveButtonSavecourse) {
        saveButtonSavecourse.addEventListener("click", function () {
          console.log("คุณกำลังคลิกปุ่มบันทึก");
          // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
        });
      }
    });


    return (
      <div className="testtable-turnleft-all">
        {lectureCourses.length > 0 && (
          <>
            <header className="testtable-Texthead">
              <div>ภาคบรรยาย</div>
              <table className="testtable-bordered-table">
                <thead>
                  <tr>
                    <th> </th>
                    <th>หลักสูตร</th>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>นก.</th>
                    <th>lec</th>
                    <th>sec</th>
                    <th>จำนวนนิสิต</th>
                    <th>สาขา,ชั้นปี</th>
                    <th>วัน</th>
                    <th>เวลา</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCoursesLec(lectureCourses)}
                </tbody>
              </table>
            </header>
            <div>
              <div class="testtable-buttonchange">
                <div class="RegisResultTable-saveButton">
                  <button id="saveButtonLec" onClick={this.handleSaveButtonLec}>
                    <p class="RegisResultTable-saveButtontext">บันทึก1</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {practicalCourses.length > 0 && (
          <>
            <header className="testtable-Texthead">
              <div>ภาคปฏิบัติ</div>
              <table className="testtable-bordered-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>หลักสูตร</th>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>นก.</th>
                    <th>lab</th>
                    <th>sec</th>
                    <th>จำนวนนิสิต</th>
                    <th>สาขา,ชั้นปี</th>
                    <th>วัน</th>
                    <th>เวลา</th>
                    <th>ห้องlab</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCoursesPrac(practicalCourses)}
                </tbody>
              </table>
            </header>
            <div>
              <div class="testtable-buttonchange">
                <div class="RegisResultTable-saveButton">
                  <button id="saveButtonLab" onClick={this.handleSaveButtonLab}>
                    <p class="RegisResultTable-saveButtontext">บันทึก2</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <header className="testtable-Texthead">
          <div>ผลการลงทะเบียนเบื้องต้น</div>
          <table className="testtable-bordered-table">
            <thead>
              <tr>
                <th> </th>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>นก.</th>
                <th>lab/lec</th>
                <th>sec</th>
                <th>จำนวนนิสิต</th>
                <th>ชั้นปี</th>
                <th>วัน</th>
                <th>เวลา</th>
                <th>ห้องlab</th>
              </tr>
            </thead>
            <tbody>
            {registrationData.map((course, index) => (
                <tr key={index}>
                  <td><div className="testtable-image-container">
                    <img
                      src={MyImage}
                      alt=" "
                      className="testtable-centered-image"
                      onClick={() => this.handleDeleteRow1(course.id)}
                    />
                  </div></td>
                  <td>{course.idsubject}</td>
                  <td>{course.name}</td>
                  <td>{course.credit}</td>
                  <td>{course.lab_lec}</td>
                  <td>{course.sec}</td>
                  <td>{course.n_people}</td>
                  <td>{course.class}</td>
                  <td>{course.day}</td>
                  <td>{course.time_start}-{course.time_end}</td>
                  <td>{course.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
      </div>

    );
  }
}
export default RegisTa;
