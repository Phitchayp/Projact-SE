import React, { useState, useEffect } from 'react';
import "./RegisResultTable.css"; // Import CSS file for table styling
import MyImage from "../assets/Vector.png";
import RegisTa from "./testtable";
// import SearchBar from "./SearchBar";
import "./SearchBar.css";
import Axios from "axios";
import Swal from 'sweetalert2';

import searchIcon from "../assets/searchbar.svg"; // Import รูปไอคอน

function RegisResultTable() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectyear, setSelectyear] = useState("");
  const [selectterm, setSelectterm] = useState("");

  const [dateTime, setDateTime] = useState('');

  const [teacherTime, setTeacherTime] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const thaiDateTime = new Date().toLocaleString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',

      });
      setDateTime(thaiDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /// ดึงค่า ///
  useEffect(() => {
    // ดึงข้อมูลเวลาของอาจารย์จากฐานข้อมูล
    Axios.get("http://localhost:3001/gettimeteacher")
      .then(response => {
        // เซ็ตข้อมูลเวลาของอาจารย์ใน state
        setTeacherTime(response.data);
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถดึงข้อมูลได้',
          text: 'กรุณาลองใหม่อีกครั้ง',
          customClass: {
            title: 'kanit-font',
            content: 'kanit-font',
            confirmButton: 'kanit-font',
            cancelButton: 'kanit-font',
            popup: 'kanit-font'
          }
        });
      });
  }, []);
  ////////


  document.addEventListener("DOMContentLoaded", function () {
    // เพิ่มโค้ดที่ต้องการให้ทำงานหลังจากการโหลดหน้าเว็บเสร็จสมบูรณ์ที่นี่
    var searchButton = document.getElementById("searchButton");
    var saveButton = document.getElementById("saveButton");

    if (searchButton) {
      searchButton.addEventListener("click", function () {
        var searchText = document.getElementById("searchInput").value.trim();
        console.log("คำค้นหา:", searchText);
        // ทำสิ่งที่ต้องการกับ searchText ที่ได้รับจากผู้ใช้
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", function () {
        console.log("คุณกำลังคลิกปุ่มบันทึก");
        // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
      });
    }
  });

  const searchCourses = async () => {
    const years = selectedYear.join(',');

    try {
      const response = await Axios.get(
        `http://localhost:3001/search-courses?query=${encodeURIComponent(searchText)}&checkboxValue=${encodeURIComponent(years)}&selectterm=${encodeURIComponent(selectterm)}&selectyear=${encodeURIComponent(selectyear)}`
      );

      if (response.data.length === 0) {
        setSearchResults([{ message: "ไม่พบผลลัพธ์" }]);
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };


  const handleDropdownChange5 = (event) => {
    setSelectyear(event.target.value);
  };

  const handleDropdownChange6 = (event) => {
    setSelectterm(event.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchCourses(selectyear, selectterm);
    } else {
      setSearchResults([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };

  const [selectedCourse, setSelectedCourse] = useState({
    subject_id: "",
    subject_name: "",
    credit: "",
    category: "",
  });
  const handleSelectCourse = (course) => {
    if (!course.subject_id || !course.subject_name) {
      setSearchText("");
      setSelectedCourse({});
      setSearchResults([]);
      return;
    }

    setSearchText(`${course.subject_id} - ${course.subject_name}`);

    setSelectedCourse({
      subject_id: course.subject_id,
      subject_name: course.subject_name,
      credit: course.credit,
      category: course.category,
    });
    setSearchResults([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือกวิชา

  };


  // ฟังก์ชันสำหรับบันทึกข้อมูล
  const saveCourseRegistration = async () => {
    // Simple client-side validation
    if (!selectedCourse.subject_id || !selectedCourse.subject_name || selectedYear.length === 0 || !selectedValues.section || !selectedValues.lectureOrLab || selectedBranch.length === 0 || !selectedCourse.credit || !selectedCourse.category || !selectyear || !selectterm) {
      Swal.fire({
        title: "warning",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "warning",
      })
      return; // ยกเลิกการทำงานหากข้อมูลไม่ครบถ้วน
    }

    // Convert array of years and branches to strings
    const yearString = selectedYear.join(", ");
    const branchString = selectedBranch.join(", ");

    try {
      const response = await Axios.post("http://localhost:3001/register", {
        subject_id: selectedCourse.subject_id,
        subject_name: selectedCourse.subject_name,
        years: yearString,
        section: selectedValues.section,
        lectureOrLab: selectedValues.lectureOrLab,
        branch: branchString,
        credit: selectedCourse.credit,
        category: selectedCourse.category,
        course_year: selectyear,
        term: selectterm,
      });
      Swal.fire({
        title: "เพิ่มรายวิชาสำเร็จ",
        confirmButtonColor: "#3CB371",
        customClass: {
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          popup: 'kanit-font'
        }
      }).then(() => {
        // หลังจากกดปุ่มตกลงในป๊อปอัพ ให้รีโหลดหน้าเว็บ
        window.location.reload();
      });
    } catch (error) {
      console.error("Error saving course registration:", error);
      Swal.fire({
        title: "เพิ่มรายวิชาไม่สำเร็จ ",
        text: 'กรุณตรวจสอบข้อมูลให้ถูกต้อง',
        confirmButtonColor: "#8C3941",
        customClass: {
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          popup: 'kanit-font'
        }
      }).then(() => {
        // หลังจากกดปุ่มตกลงในป๊อปอัพ ให้รีโหลดหน้าเว็บ
        window.location.reload();
      });
    }



  };


  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked, name } = e.target;
    if (name === "years") {
      if (checked) {
        // If less than 2 years are already selected, add the new selection
        if (selectedYear.length < 4) {
          setSelectedYear(prevSelectedYear => [...prevSelectedYear, value]);
        } else {
          // Optionally notify the user that they can't select more than 2 years
          console.log("You can select up to 2 years only.");
        }
      } else {
        // Removing a selected year
        setSelectedYear(prevSelectedYear => prevSelectedYear.filter(years => years !== value));
      }
    } else if (name === "branch") {
      if (checked) {
        setSelectedBranch([...selectedBranch, value]);
      } else {
        setSelectedBranch(selectedBranch.filter((branch) => branch !== value));
      }
    }
  };
  // สร้างข้อมูลตาราง
  const [selectedValues, setSelectedValues] = useState({
    years: "",
    section: "",
    lectureOrLab: "",
    branch: "",
    subject_name: "",
    subject_id: "",
  });

  const handleDropdownChange = (event, field) => {
    setSelectedValues({
      ...selectedValues,
      [field]: event.target.value,
    });
  };

  return (
    <div style={{ fontFamily: 'Kanit' , marginLeft: '-60px'} }>
      <div class="searchBar-texthead">
        <p1>ลงทะเบียนรายวิชา</p1>

        <div>
          <div>
            {teacherTime.length > 0 && teacherTime.map((time, index) => (
              <div key={index}>

                <div style={{ flexDirection: 'row' }}>

                  <div className="time-info2" style={{ fontFamily: "kanit", marginTop: '10px' }}>
                    <p className='time-labe4' >{time.term}<span style={{ marginLeft: '10px' }}>{time.course_year}</span></p>
                    <p2 style={{ color: '#CD5C5C', fontSize: '15px', marginLeft: '10px' }}>{dateTime}</p2>


                  </div>
                  <br></br>
                  <p2 style={{ color: '#3a4746', fontSize: '14px', marginLeft: '10px', fontWeight: 'normal' }}>
                    * กรุณาเลือกปีการศึกษา <span style={{ color: '#CD5C5C', fontWeight: 'bold' }}>{time.course_year}</span>
                     <span style={{marginLeft:'5px'}}>และภาคเรียน</span> <span style={{ color: '#CD5C5C', fontWeight: 'bold' }}>{time.term}</span> ก่อนลงทะเบียน
                  </p2>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
      <div >
        <div class="searchBar-container">
          <div>
            <div style={{ marginTop: "35px", marginTop: '20px' }}>
              <div>
                <div className="text5">
                  <a>หลักสูตร</a>
                  <b>ปีการศึกษา</b>
                  <c>ภาคเรียน</c>
                </div>
                <div className="checkbox-group2">
                  <label>
                    ปี55
                    <input
                      type="checkbox"
                      name="years"
                      value="55"
                      checked={selectedYear.includes("55")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    ปี60
                    <input
                      type="checkbox"
                      name="years"
                      value="60"
                      checked={selectedYear.includes("60")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    ปี65
                    <input
                      type="checkbox"
                      name="years"
                      value="65"
                      checked={selectedYear.includes("65")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    ปี70
                    <input
                      type="checkbox"
                      name="years"
                      value="70"
                      checked={selectedYear.includes("70")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  {/* <div className="dropdownRegisResultTable "> */}
                  <div className="dropdown5" style={{ marginLeft: '1px', marginRight: '5px' }}>
                    <select value={selectyear.course_year} onChange={(event) => handleDropdownChange5(event, "course_year")}>
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

                  <div className="dropdown6">
                    <select value={selectterm.term} onChange={(event) => handleDropdownChange6(event, "term")}>
                      <option value=""></option>
                      <option value="ภาคต้น">ภาคต้น</option>
                      <option value="ภาคปลาย">ภาคปลาย</option>
                    </select>
                  </div>
                  {/* </div> */}
                </div>



                <div className="RegisResultTable-searchbar-changposition">
                  <div className="searchBar-subjectBox">รายวิชา</div>
                  <div
                    className="searchBar-searchBox"
                    style={{ position: "relative" }}
                  >
                    <input
                      value={searchText}
                      onChange={handleSearchChange}
                      type="text"
                      placeholder="รหัสวิชา, ชื่อวิชา"
                    />
                    <button onClick={searchCourses}>
                      <img src={searchIcon} alt="Search Icon" />
                    </button>
                    {searchResults.length > 0 ? (
                      <div className="autocomplete-dropdown">
                        {searchResults.map((course, index) => (
                          <div
                            className="autocomplete-item"
                            key={index}
                            onClick={() => handleSelectCourse(course)}
                          >
                            {(course.subject_id !== undefined && course.subject_name !== undefined) ? (
                              <>
                                {course.subject_id} - {course.subject_name}
                              </>
                            ) : (
                              "ไม่พบผลลัพธ์"
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      null
                    )}





                  </div>
                </div>
                <div className="text7">
                  <a>จำนวนsec</a>
                  <a>ภาคปฏิบัติ/บรรยาย</a>
                  <a>สาขา</a>
                </div>
                <div className="dropdown16">
                  <select
                    value={selectedValues.section}
                    onChange={(event) => handleDropdownChange(event, "section")}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="dropdown17">
                  <select
                    value={selectedValues.lectureOrLab}
                    onChange={(event) =>
                      handleDropdownChange(event, "lectureOrLab")
                    }
                  >
                    <option value=""></option>
                    <option value="ภาคบรรยาย">ภาคบรรยาย</option>
                    <option value="ภาคปฏิบัติ">ภาคปฏิบัติ</option>
                  </select>
                </div>
                <div>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T05"
                        checked={selectedBranch.includes("T05")}
                        onChange={handleCheckboxChange}
                      />
                      T05
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T12"
                        checked={selectedBranch.includes("T12")}
                        onChange={handleCheckboxChange}
                      />
                      T12
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T13"
                        checked={selectedBranch.includes("T13")}
                        onChange={handleCheckboxChange}
                      />
                      T13
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T14"
                        checked={selectedBranch.includes("T14")}
                        onChange={handleCheckboxChange}
                      />
                      T14
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T17"
                        checked={selectedBranch.includes("T17")}
                        onChange={handleCheckboxChange}
                      />
                      T17
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T18"
                        checked={selectedBranch.includes("T18")}
                        onChange={handleCheckboxChange}
                      />
                      T18
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T19"
                        checked={selectedBranch.includes("T19")}
                        onChange={handleCheckboxChange}
                      />
                      T19
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T20"
                        checked={selectedBranch.includes("T20")}
                        onChange={handleCheckboxChange}
                      />
                      T20
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T21"
                        checked={selectedBranch.includes("T21")}
                        onChange={handleCheckboxChange}
                      />
                      T21
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T22"
                        checked={selectedBranch.includes("T22")}
                        onChange={handleCheckboxChange}
                      />
                      T22
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="branch"
                        value="T23"
                        checked={selectedBranch.includes("T23")}
                        onChange={handleCheckboxChange}
                      />
                      T23
                    </label>
                  </div>
                </div>
                <div className="RegisResultTable-buttonchange">
                  <div className="RegisResultTable-saveButton">
                    <button id="saveButton" onClick={saveCourseRegistration}>
                      <p className="RegisResultTable-saveButtontext">บันทึก</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SearchBar></SearchBar> */}

      <RegisTa></RegisTa>
    </div>
  );
}

export default RegisResultTable;
