import React, { useState, useEffect } from "react";
import "./ResultTech.css";
import CheckRegisCoruse from "./CheckRegisCoruse";
import searchIcon from "../assets/searchbar.svg";
import TimePickerRe from "./TimepickerResultSearch";
import newSearchIcon from "../assets/newsearch.png";
import Axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

 
function ResultTeach() {
  const tableData = [2569, 2568, 2567, 2566, 2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 'วิชาบังคับ', 'วิชาเลือก', 'วิชาแกน',];
  const [selectedValue5, setSelectedValue5] = useState("");
  const [selectedValue6, setSelectedValue6] = useState("");
  const [selectedValue7, setSelectedValue7] = useState("");
  const [SelectDay, setSelectDay] = useState("");
 
  const handleDropdownSelectDay = (event) => {
    setSelectDay(event.target.value);
  };
  const handleDropdownChange5 = (event) => {
    setSelectedValue5(event.target.value);
  };
 
  const handleDropdownChange6 = (event) => {
    setSelectedValue6(event.target.value);
  };
 
  const handleDropdownChange7 = (event) => {
    setSelectedValue7(event.target.value);
  };
 
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedValue10, setSelectedValue10] = useState("");
  const [selectedValue11, setSelectedValue11] = useState("");
  const [selectedValue12, setSelectedValue12] = useState("");
  const [selectedValue13, setSelectedValue13] = useState("");
  // แถบขาว
  const [searchText1, setSearchText1] = useState("");
  const [searchResults1, setSearchResults1] = useState([]);
  const [allname, setAllname] = useState([]);
  const [filterresult, setFilterresult] = useState([]);
  const [searchNameTable, setSearchNameTable] = useState("");
 
  // กรองข้อมูลตามคำค้นหาที่ผู้ใช้ป้อนลงในช่องค้นหา และเก็บผลลัพธ์ไว้ใน filterdata
  const handlesearch = (event) => {
    const search = event.target.value;
    console.log(search);
    setSearchNameTable(search);
    if (search !== "") {
      const filterdata = allname.filter((item) => {
        for (const key in item) {
            if (typeof item[key] === 'string' && item[key].indexOf(search) !== -1) {
                return true;
            }
        }
        return false;
      });
      setFilterresult(filterdata);
    } else {
      setFilterresult(allname);
    }
  };
 
 
  useEffect(() => {
    const getname = async () => {
      const getres = await fetch("http://localhost:3001/courset");
      const setname = await getres.json();
      //console.log(setname);
      setAllname(await setname);
    };
    getname();
  }, []);
 
  const handleAdvancedSearch = async () => {
    // Validate ว่าทุก dropdown และช่องค้นหาถูกกรอกหรือเลือกค่าหรือไม่
    if (
      selectedValue10 ||
      selectedValue11 ||
      selectedValue12 ||
      selectedValue13 ||
      searchText1.trim() !== "" ||
      searchText2.trim() !== ""
    ) {
      setSearching(true);
      console.log("Advanced Searching...");
    }
 
    try {
      const response1 = await Axios.get(
        `http://localhost:3001/search-courses?query=${searchText1}`
      );
      const response2 = await Axios.get(
        `http://localhost:3001/search-nameajarn?query=${searchText2}`
      );
     
      if (response1.data.length === 0 && response2.data.length === 0) {
        alert("ไม่พบข้อมูลชื่อผู้ใช้และรายวิชานี้ กรุณากรอกข้อมูลให้ถูกต้อง");
      } else if (response1.data.length !== 0 ) {
        alert("ไม่พบข้อมูลรายวิชานี้ กรุณากรอกข้อมูลให้ถูกต้อง");
      } else if (response2.data.length === 0) {
        alert("ไม่พบข้อมูลชื่อผู้ใช้นี้ กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        setSearchResults([response1.data, response2.data]);
      }
    } catch (error) {
      console.error("Error searching nameajarn:", error);
      console.error("Error searching course:", error);
    } finally {
      // เมื่อค้นหาเสร็จสิ้น ปิดการค้นหา
      setSearching(false);
    }
  };    
 
 
  // ----------------searchbarCourse------------------------
 
  document.addEventListener("DOMContentLoaded", function () {
    var searchButton = document.getElementById("searchButton");
 
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        var searchText = document.getElementById("searchInput").value.trim();
        console.log("คำค้นหา:", searchText);
        // ทำสิ่งที่ต้องการกับ searchText ที่ได้รับจากผู้ใช้
      });
    }
  });
 
  // แถบขาว
  const searchCourses = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/search-courses?query=${searchText1}`
      );
      setSearchResults1(response.data); // อัปเดต state ด้วยข้อมูลผลการค้นหา
      console.log(response.data.length)
      console.log(response.data)
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };
 
  const handleSearchChangeCourse = (e) => {
    setSearchText1(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchCourses();
    } else {
      setSearchResults1([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };
 
  const [selectedCourse, setSelectedCourse] = useState({
    subject_id: "",
    subject_name: "",
  });
  const handleSelectCourse = (course) => {
    setSearchText1(`${course.subject_id} - ${course.subject_name}`);
    setSelectedCourse({
      subject_id: course.subject_id,
      subject_name: course.subject_name,
    });
    setSearchResults1([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือกวิชา
  };
 
 // --------------------searchbarName--------------------
 
  document.addEventListener("DOMContentLoaded", function () {
    var searchButton = document.getElementById("searchButton");
 
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        var searchText = document.getElementById("searchInput").value.trim();
        console.log("คำค้นหา:", searchText);
        // ทำสิ่งที่ต้องการกับ searchText ที่ได้รับจากผู้ใช้
      });
    }
  });
  const [searchText2, setSearchText2] = useState("");
  const [searchResults2, setSearchResults2] = useState([]);
 
  const searchNameAjarn = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/search-nameajarn?query=${searchText2}`
      );
      setSearchResults2(response.data); // อัปเดต state ด้วยข้อมูลผลการค้นหา
    } catch (error) {
      console.error("Error searching nameajarn:", error);
    }
  };
 
  const handleSearchChangeName = (e) => {
    setSearchText2(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchNameAjarn();
    } else {
      setSearchResults2([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };
 
  const [selectedName, setSelectedName] = useState({
    name: "",
  });
  const handleSelectName = (usersaj) => {
    setSearchText2(`${usersaj.name}`);
    setSelectedName({
      name: usersaj.name,
    });
      setSearchResults2([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือก
  };
 
 
 
  return (
    <div>
      <div className="turnleft-allEdu">
        <div className="text1">
          <a>ปีการศึกษา</a>
          <a style={{marginLeft:'-25px'}}>ภาคการศึกษา</a>
          <a style={{marginLeft:'-40px'}}>ห้อง</a>
          <a style={{marginLeft:'22px'}}>วัน</a>
          <a style={{marginLeft:'35px'}}>เวลาเริ่มต้น</a>
          <a style={{marginLeft:'-20px'}}>เวลาสิ้นสุด</a>
        </div>
        <div class="flex-container">
          <div className="dropdown5" style={{marginLeft:'1px', marginRight:'5px'}}>
            <select value={selectedValue5} onChange={handleDropdownChange5}>
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
            <select value={selectedValue6} onChange={handleDropdownChange6}>
              <option value=""></option>
              <option value="ภาคต้น">ภาคต้น</option>
              <option value="ภาคปลาย">ภาคปลาย</option>
              <option value="ภาคฤดูร้อน">ทั้งหมด</option>
            </select>
          </div>
 
          <div className="dropdown7">
            <select value={selectedValue7} onChange={handleDropdownChange7}>
              <option value=""></option>
              <option value="LABCOM1">Lab Com1</option>
              <option value="LABCOM2">Lab Com 2</option>
              <option value="LABCOM23">Lab Com 23</option>
              <option value="LABCOMDAT">Lab Com Dat</option>
              <option value="LABLOGIC15309">Lab Logic 15309</option>
              <option value="LABLOGIC">Lab Logic</option>
              <option value="1969/1">1969/1</option>
              <option value="25202">25202</option>
            </select>
 
          </div>
          <div className="dropdownDay">
          <select value={SelectDay} onChange={handleDropdownSelectDay}>
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
          <div>
            <div class="timepickers-container1">
              <TimePickerRe></TimePickerRe>
            </div>
            <div class="timepickers-container2">
              <TimePickerRe></TimePickerRe>
             
     
            </div>
          </div>
        </div>
 
        <div className="ChangePosition3" >
          <div style={{ width: "230px" ,marginTop:'10px'}}>
            <div class="ResultTech-Text">ชื่อผู้สอน</div>
            <div
              class="ResultTechsearchBar-searchBox"
              style={{ display: "flex", alignItems: "center" }}
             
            >
              <input
                value={searchText2}
                onChange={handleSearchChangeName}
                type="text"
                placeholder="ชื่อผู้สอน"
              />
              <button onClick={searchNameAjarn}>
                <img src={searchIconName} alt="Search Icon" />
              </button>
              {searchResults2.length > 0 && (
                <div className="autocomplete-dropdown">
                  {searchResults2.map((usersaj, index) => (
                    <div
                      className="autocomplete-item"
                      key={index}
                      onClick={() => handleSelectName(usersaj)}
                    >
                      {usersaj.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
           
          </div>
 
          <div style={{ width: "450px" ,marginTop:'10px'}}>
            <div class="ResultTech-Text">รหัสวิชา/ชื่อวิชา</div>
            <div
              class="ResultTechsearchBar-searchBoxSub"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                      value={searchText1}
                      onChange={handleSearchChangeCourse}
                      type="text"
                      placeholder="รหัสวิชา, ชื่อวิชา"
                    />
                    <button onClick={searchCourses}>
                      <img src={searchIconCourse} alt="Search Icon" />
                    </button>
                    {searchResults1.length > 0 && (
                      <div className="autocomplete-dropdown">
                        {searchResults1.map((course, index) => (
                          <div
                            className="autocomplete-item"
                            key={index}
                            onClick={() => handleSelectCourse(course)}
                          >
                            {course.subject_id} - {course.subject_name}
                          </div>
                        ))}
                      </div>
                    )}
            </div>
          </div>
 
          <div className="ButtonChange">
                {/* ตรวจสอบว่ากำลังค้นหาหรือไม่ */}
                {searching ? (
                  <p>Loading...</p>
                ) : (
                  <button
                  style={{
                    backgroundColor: "#127151",
                    border: "5px",
                    cursor: "pointer",
                    width: "110px",
                    height: "37px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 10px",
                  }}
                  onClick={() => handlesearch({ target: { value: searchText2 } })}>
                    <span
                  style={{ color: "white",
                  fontSize: "16px",
                  fontFamily: "Kanit" }}
                >{ "search"}
                </span>
                <img
                  src={newSearchIcon}
                  alt="New Search Icon"
                  style={{ width: "16px", height: "16px" }}
                />
                </button>
                )}
             {/* <table className="table " style={{ color:"black" }}>
              <thead>
                <tr>
                    <th>No.</th>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>นก.</th>
                    <th>lab/lec</th>
                    <th>sec</th>
                    <th>ชื่อผู้สอน</th>
                    <th>จำนวนนิสิต</th>
                    <th>ชั้นปี</th>
                    <th>วัน</th>
                    <th>เวลา</th>
                    <th>ห้องlab</th>
                </tr>
              </thead>
              <tbody>
                {serachcountry.length > 1
                  ? filterresult.map((filtercountry, index) => (
                    <tr key={index}>
                        <td>{`${filtercountry.No}`}</td>
                        <td>{`${filtercountry.idsubject}`}</td>
                        <td>{`${filtercountry.name}`}</td>
                        <td>{`${filtercountry.credit}`}</td>
                        <td>{`${filtercountry.lab_lec}`}</td>
                        <td>{`${filtercountry.sec}`}</td>
                        <td className="CheckRegisCoruse-blue-text">{`${filtercountry.teacher}`}</td>
                        <td>{`${filtercountry.n_people}`}</td>
                        <td>{filtercountry.class}</td>
                        <td className="CheckRegisCoruse-blue-text">{`${filtercountry.day}`}</td>
                        <td>{`${filtercountry.time_start}`}-{`${filtercountry.time_end}`}</td>
                        <td>{`${filtercountry.room}`}</td>
                   </tr>
                    ))
                  : allcountry.map((getcon, index) => (
                    <tr key={index}>
                        <td>{`${getcon.No}`}</td>
                        <td>{`${getcon.idsubject}`}</td>
                        <td>{`${getcon.name}`}</td>
                        <td>{`${getcon.credit}`}</td>
                        <td>{`${getcon.lab_lec}`}</td>
                        <td>{`${getcon.sec}`}</td>
                        <td className="CheckRegisCoruse-blue-text">{`${getcon.teacher}`}</td>
                        <td>{`${getcon.n_people}`}</td>
                        <td>{getcon.class}</td>
                        <td className="CheckRegisCoruse-blue-text">{`${getcon.day}`}</td>
                        <td>{`${getcon.time_start}`}-{`${getcon.time_end}`}</td>
                        <td>{`${getcon.room}`}</td>
                  </tr>
                    ))}
              </tbody>
            </table> */}
          </div>
          </div>
 
        <div>
          <div class="DateAdmin-textEdu">
            <p1>ผลการลงทะเบียนของอาจารย์ทั้งหมด</p1>{" "}
          </div>
          {/* <CheckRegisCoruse></CheckRegisCoruse> */}
          <div className='CheckRegisCoruse-right'>
          {/* ตารางผลการลงทะเบียน */}
              <header className="CheckRegisCoruse-Texthead">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls"
                filename="ผลการลงทะเบียน"
                sheet="ผลการลงทะเบียน"
                buttonText="EXPORT TO EXCEL"/>
              <table className="CheckRegisCoruse-bordered-table" id="table-to-xls">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>นก.</th>
                    <th>lab/lec</th>
                    <th>sec</th>
                    <th>ชื่อผู้สอน</th>
                    <th>จำนวนนิสิต</th>
                    <th>ชั้นปี</th>
                    <th>วัน</th>
                    <th>เวลา</th>
                    <th>ห้องlab</th>
                  </tr>
                </thead>
                <tbody>
                {searchNameTable?.length > 0 ? (
                    filterresult
                        .filter(filterName => (
                            filterName.teacher
                            // Add more conditions for additional fields if needed
                        ))
                        .map((filterName, index) => (
                            <tr key={index}>
                                <td>{`${filterName.No}`}</td>
                                <td>{`${filterName.idsubject}`}</td>
                                <td>{`${filterName.name}`}</td>
                                <td>{`${filterName.credit}`}</td>
                                <td>{`${filterName.lab_lec}`}</td>
                                <td>{`${filterName.sec}`}</td>
                                <td className="CheckRegisCoruse-blue-text">{`${filterName.teacher}`}</td>
                                <td>{`${filterName.n_people}`}</td>
                                <td>{filterName.class}</td>
                                <td className="CheckRegisCoruse-blue-text">{`${filterName.day}`}</td>
                                <td>{`${filterName.time_start}`}-{`${filterName.time_end}`}</td>
                                <td>{`${filterName.room}`}</td>
                            </tr>
                        ))
                ) : (
                    allname
                        .filter(getcon => (
                            getcon.name
                            // Add more conditions for additional fields if needed
                        ))
                        .map((getcon, index) => (
                            <tr key={index}>
                                <td>{`${getcon.No}`}</td>
                                <td>{`${getcon.idsubject}`}</td>
                                <td>{`${getcon.name}`}</td>
                                <td>{`${getcon.credit}`}</td>
                                <td>{`${getcon.lab_lec}`}</td>
                                <td>{`${getcon.sec}`}</td>
                                <td className="CheckRegisCoruse-blue-text">{`${getcon.teacher}`}</td>
                                <td>{`${getcon.n_people}`}</td>
                                <td>{getcon.class}</td>
                                <td className="CheckRegisCoruse-blue-text">{`${getcon.day}`}</td>
                                <td>{`${getcon.time_start}`}-{`${getcon.time_end}`}</td>
                                <td>{`${getcon.room}`}</td>
 
 
                            </tr>
                      ))
                  )}
 
                </tbody>
              </table>
              </header>
            </div>
          </div>
           
 
        </div>
      </div>
  );
}

export default ResultTeach;