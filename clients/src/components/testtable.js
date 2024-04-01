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
    selectDay: "",
    inputValue: "",
    selectedClassYears: [],
    startTime: null,
    endTime: null,
  };

  handleDayChange = (event) => {
    this.setState({ selectDay: event.target.value });
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      this.setState((prevState) => ({
        selectedClassYears: [...prevState.selectedClassYears, value],
      }));
    } else {
      this.setState((prevState) => ({
        selectedClassYears: prevState.selectedClassYears.filter(
          (year) => year !== value
        ),
      }));
    }
  };

  componentDidMount() {
    this.fetchData();
    this.fetchCourseSections();
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
        registrationData: registrationData.data,
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
      const registrationData = await Axios.get(
        "http://localhost:3001/registration-data"
      );
      const lectureResponse = await Axios.get(
        "http://localhost:3001/lecture-courses"
      );
      const practicalResponse = await Axios.get(
        "http://localhost:3001/lab-courses"
      );
      this.setState({
        registrationData: registrationData.data,
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
      .then((response) => {
        // Handle the successful deletion
        console.log(response.data);
        // Refresh the data in your component or remove the row from the state
        this.setState((prevState) => ({
          lectureCourses: prevState.lectureCourses.filter(
            (course) => course.id !== courseId
          ),
          practicalCourses: prevState.practicalCourses.filter(
            (course) => course.id !== courseId
          ),
        }));
      })
      .catch((error) => {
        // Handle the error case
        console.error("There was an error!", error);
      });
  };
  handleDeleteRow1 = (courseId) => {
    Axios.delete(`http://localhost:3001/delete-courset/${courseId}`)
      .then((response) => {
        // Handle the successful deletion
        console.log(response.data);
        // Refresh the data in your component or remove the row from the state
        this.setState((prevState) => ({
          registrationData: prevState.registrationData.filter(
            (course) => course.id !== courseId
          ),
        }));
      })
      .catch((error) => {
        // Handle the error case
        console.error("There was an error!", error);
      });
  };

  renderCoursesLec = (courses) => {
    const { selectDay } = this.state;
    const { inputValue } = this.state;
    const { onOptionsChange } = this.state;
    const { handleCheckboxChange } = this.state;
    const {startTime} = this.state;
    const {endTime} = this.state;

    return courses.flatMap((course, index) =>
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
            <td>{course.sec_num}</td>{" "}
            {/* แสดงผลรวมของ 800 และค่า index และ sectionIndex */}
            <td>
              <div>
                <div>
                  <input
                    value={inputValue}
                    onChange={this.handleInputChange} // เรียกใช้ setInputValue เพื่ออัปเดตค่า inputValue
                    style={{ width: "70px" }}
                  />
                </div>
              </div>
            </td>
            <td>
              {course.branch}
              <div>
                <div className="App">
                  <div className="boxContainer">
                    <div className="buttonGroup">
                      <input
                        type="checkbox"
                        id="option1"
                        name="check"
                        value="1"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="option1">
                        <span> 1</span>
                      </label>
                    </div>

                    <div className="buttonGroup">
                      <input
                        type="checkbox"
                        id="option2"
                        name="check"
                        value="2"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="option2">
                        <span> 2</span>
                      </label>
                    </div>

                    <div className="buttonGroup">
                      <input
                        type="checkbox"
                        id="option3"
                        name="check"
                        value="3"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="option3">
                        <span> 3</span>
                      </label>
                    </div>

                    <div className="buttonGroup">
                      <input
                        type="checkbox"
                        id="option4"
                        name="check"
                        value="4"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="option4">
                        <span> 4 </span>
                      </label>
                    </div>

                    <div className="buttonGroup">
                      <input
                        type="checkbox"
                        id="optionX"
                        name="check"
                        value="X"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="optionX">
                        <span> X</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="testtable-dropdownposition">
                <select
                  className="testtable-dropdown"
                  value={selectDay}
                  onChange={(e) => {
                    this.setState({ selectDay: e.target.value });
                  }}
                >
                  {/* 2. Dropdown เลือกวัน */}
                  <option value=""></option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </td>
            <td>
              <div>
                <div>
                <TimePickerTa // Pass startTime and endTime to TimePickerTa component
                  onStartTimeChange={(time) => this.setState({ startTime: time })}
                  onEndTimeChange={(time) => this.setState({ endTime: time })}
                />
                </div>
              </div>
            </td>
            <td> </td>
          </tr>
        );
      })
    );
  };

  renderCoursesPrac = (courses) => {
    return courses.flatMap((course, index) =>
      Array.from({ length: course.section }, (_, sectionIndex) => {
        const key = `${index}-${sectionIndex}`; // สร้าง key จากการรวม index และ sectionIndex
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
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
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
    );
  };

  // handleDeleteRow = (event) => {
  //   // รับค่า index ของแถวที่คลิกที่ภาพ
  //   const rowIndex = event.target.parentNode.parentNode.rowIndex;
  //   // ลบแถวออกจากตาราง
  //   if(rowIndex !== 0) { // ไม่ให้ลบแถวแรก (หัวตาราง)
  //     document.querySelector('.bordered-table').deleteRow(rowIndex);
  //   }
  // }
  handleSaveButtonLec = async (optionsText) => {
    const { lectureCourses, selectDay, onOptionsChange } = this.state;
    const name = sessionStorage.getItem("name");
    try {
      // ดึงข้อมูลจาก lectureCourses
      const coursesData = this.state.lectureCourses.map((course) => ({
        idsubject: course.subject_id,
        name: course.subject_name,
        sec: course.sec_num,
        lab_lec: course.lectureOrLab,
        class: course.branch,
        n_people: this.state.inputValue,
        credit: course.credit,
        day: this.state.selectDay, // ใช้ค่า selectDay ที่เก็บไว้ใน state
        course_year: course.course_year,
        term: course.term,
        teacher: name,
        time_start: this.state.startTime,
        time_end: this.state.endTime,
        room:"-",
      }));

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      const response = await Axios.post(
        "http://127.0.0.1:3001/registerlec",
        coursesData
      );

      // ดำเนินการต่อเมื่อบันทึกสำเร็จ
      console.log("บันทึกข้อมูลสำเร็จ:", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
    }
  };

  handleSaveButtonLab = async () => {
    try {
      // ดึงข้อมูลจาก practicalCourses
      const coursesData = this.state.practicalCourses.map((course) => ({
        years: course.years,
        subject_id: course.subject_id,
        subject_name: course.subject_name,
        credit: course.credit,
        // รายละเอียดอื่น ๆ ที่ต้องการบันทึก
      }));

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      const response = await Axios.post(
        "URL_TO_YOUR_API_ENDPOINT",
        coursesData
      );

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
                <tbody>{this.renderCoursesLec(lectureCourses)}</tbody>
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
                <tbody>{this.renderCoursesPrac(practicalCourses)}</tbody>
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
                  <td>
                    <div className="testtable-image-container">
                      <img
                        src={MyImage}
                        alt=" "
                        className="testtable-centered-image"
                        onClick={() => this.handleDeleteRow1(course.id)}
                      />
                    </div>
                  </td>
                  <td>{course.idsubject}</td>
                  <td>{course.name}</td>
                  <td>{course.credit}</td>
                  <td>{course.lab_lec}</td>
                  <td>{course.sec}</td>
                  <td>{course.n_people}</td>
                  <td>{course.class}</td>
                  <td>{course.day}</td>
                  <td>
                    {course.time_start}-{course.time_end}
                  </td>
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
