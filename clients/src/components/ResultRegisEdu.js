import React, { useState, useEffect } from "react";
import "./ResultRegisEdu.css"; 
import CheckRegisCoruse from "./CheckRegisCoruse";
import searchIconName from "../assets/searchbar.svg";
import searchIconCourse from "../assets/searchbar.svg";
import newSearchIcon from "../assets/newsearch.png";
import Axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Roomsearch from "./roomsearch";

function ResultRegisEdu() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectRoom, setSelectRoom] = useState("");
  const [SelectDay, setSelectDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  
  const handleDropdownChangeYear = (event) => {
    setSelectYear(event.target.value);
    setSelectedYear(event.target.value);
  };
  const handleDropdownChangeTerm = (event) => {
    setSelectTerm(event.target.value);
    setSelectedTerm(event.target.value);
  };
  const handleDropdownChangeRoom = (event) => {
    setSelectRoom(event.target.value);
    setSelectedRoom(event.target.value);
    
  };
  const handleDropdownSelectDay = (event) => {
    setSelectDay(event.target.value);
    setSelectedDay(event.target.value);
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
  const [searchTable, setSearchTable] = useState("");
  const [subject,setsubject] = useState("");
  const [timestart,settime] = useState("");
  const [searchText3, setSearchText3] = useState("");
  const [searchResults3, setSearchResults3] = useState([]);


  // กรองข้อมูลตามคำค้นหาที่ผู้ใช้ป้อนลงในช่องค้นหา และเก็บผลลัพธ์ไว้ใน filterdata
  const handlesearch = (event) => {
    const searchName = event.target.value.toLowerCase();
    const searchsubject = event.target.value.toLowerCase();
    console.log(searchName&&searchsubject);
    setSearchTable(searchName||searchsubject||selectedDay||selectedYear);
    

    if (selectedYear!==" ") {
      // กรองข้อมูลปีที่ตรงกับข้อมูลปีในตาราง
      const filterData = allname.filter((item) => item.course_year === selectedYear);
      setFilterresult(filterData);
    }
    if (searchText1 && !searchText2 && !selectedDay) {
      const filterData = allname.filter((item) => item.name === searchText1);
      setFilterresult(filterData);
    }
    // กรณีที่มีการกรอกเฉพาะช่องค้นหาชื่ออาจารย์เท่านั้น
    else if (!searchText1 && searchText2 && !selectedDay) {
      const filterData = allname.filter((item) => item.teacher === searchText2);
      setFilterresult(filterData);
    }
    // กรณีที่มีการเลือกวันเท่านั้น
    else if (!searchText1 && !searchText2 && selectedDay) {
      const filterData = allname.filter((item) => item.day === selectedDay);
      setFilterresult(filterData);
    }
    // กรณีที่มีการกรอกช่องค้นหาชื่ออาจารย์และช่องค้นหาชื่อวิชาเท่านั้น
    else if (searchText1 && searchText2 && !selectedDay) {
      const filterData = allname.filter((item) => item.name === searchText1 && item.teacher === searchText2);
      setFilterresult(filterData);
    }
    // กรณีที่มีการกรอกช่องค้นหาชื่อวิชาและเลือกวันเท่านั้น
    else if (searchText1 && !searchText2 && selectedDay) {
      const filterData = allname.filter((item) => item.name === searchText1 && item.day === selectedDay);
      setFilterresult(filterData);
    }
    // กรณีที่มีการกรอกช่องค้นหาชื่ออาจารย์และเลือกวันเท่านั้น
    else if (!searchText1 && searchText2 && selectedDay) {
      const filterData = allname.filter((item) => item.teacher === searchText2 && item.day === selectedDay);
      setFilterresult(filterData);
    }
    // กรณีที่มีการกรอกช่องค้นหาชื่ออาจารย์ ช่องค้นหาชื่อวิชา และเลือกวัน
    else if (searchText1 && searchText2 && selectedDay) {
      const filterData = allname.filter((item) => 
        item.name === searchText1 && 
        item.teacher === searchText2 &&
        item.day === selectedDay
      );
      setFilterresult(filterData);
    }
    // กรณีที่ไม่ตรงเงื่อนไขใด ๆ ทั้งหมดให้แสดงผลข้อมูลทั้งหมด
    else {
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
        `http://localhost:3001/courset?query=${searchText1}`
      );
      const response2 = await Axios.get(
        `http://localhost:3001/courset?query=${searchText2}`
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
  

  // ----------------searchbarCourse----------------------------------------------------------------------------

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
  const searchCourses = async (event) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/courset?query=${searchText1}`
      );
      setSearchResults1(response.data);
      setsubject(event.target.value); // อัปเดต state ด้วยข้อมูลผลการค้นหา
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
    name: "",
  });
  const handleSelectCourse = (courset) => {
    setSearchText1(`${courset.name}`);
    setSelectedCourse({
      subject_name: courset.name,
    });
      setSearchResults1([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือกวิชา
  };
  
 // --------------------searchbarName--------------------------------------------------------------------------
  
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
        `http://localhost:3001/courset?query=${searchText2}`
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
    teacher: "",
  });
  const handleSelectName = (courset) => {
    setSearchText2(`${courset.teacher}`);
    setSelectedName({
      teacher: courset.teacher,
    });
      setSearchResults2([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือก
  };

  // ---------------------------------searchtime---------------------------------------------------------
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
  
  
  const searchTime = async (event) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/courset?query=${searchText3}`
      );
      setSearchResults3(response.data);
      settime(event.target.value); // อัปเดต state ด้วยข้อมูลผลการค้นหา
      console.log(response.data.length)
      console.log(response.data)
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };
  
  const handleSearchChangeTime = (e) => {
    setSearchText3(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchTime();
    } else {
      setSearchResults3([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };
  
  const [selectedTime, setSelectedTime] = useState({
    name: "",
  });
  const handleSelectTime = (courset) => {
    setSearchText3(`${courset.time_start}`);
    setSelectedCourse({
      time_start: courset.time_start,
    });
      setSearchResults3([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือกวิชา
  };


  return (
    <div>
      <div className="turnleft-allEdu">
        <div className="text1">
          <a>ปีการศึกษา</a>
          <a style={{marginLeft:'-25px'}}>ภาคการศึกษา</a>
          <a style={{marginLeft:'-40px'}}>ห้อง</a>
          <a style={{marginLeft:'22px'}}>วัน</a>
          <a style={{marginLeft:'35px'}}>เวลา</a>
          
        </div>
        <div class="flex-container">
          <div className="dropdown5" style={{marginLeft:'1px', marginRight:'5px'}}>
            <select value={selectedYear} onChange={handleDropdownChangeYear}>
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
            <select value={selectedTerm} onChange={handleDropdownChangeTerm}>
              <option value=""></option>
              <option value="ภาคต้น">ภาคต้น</option>
              <option value="ภาคปลาย">ภาคปลาย</option>
              
            </select>
          </div>

          <div className="dropdown7">
            <div value={Roomsearch} onChange={handleDropdownChangeRoom}>
            <Roomsearch/>
            </div>

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
            <div style={{ width: "50px" ,marginTop:'10px'}}>
            <div class="ResultTechsearchBar-searchBox"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                      value={searchText3}
                      onChange={handleSearchChangeTime}
                      type="text"
                      placeholder="เริ่มต้น-สิ้นสุด"
                    />
                    {searchResults1.length > 0 && (
                      <div className="autocomplete-dropdown">
                        {searchResults1
                        .filter((courset, index, self) =>
                        self.findIndex((n) => n.time_start === courset.time_start-courset.time_end) === index
                        )
                        .map((courset, index) => (
                          <div
                            className="autocomplete-item"
                            key={index}
                            onClick={() => handleSelectTime(courset)}
                          >
                            {courset.time_start}
                          </div>
                        ))}
                        
                      </div>
                    )}
            </div>
            </div>
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
                  {searchResults2
                  .filter((courset, index, self) =>
                  self.findIndex((t) => t.teacher === courset.teacher) === index
                  )
                  .map((courset, index) => (
                    <div
                      className="autocomplete-item"
                      key={index}
                      onClick={() => handleSelectName(courset)}
                    >
                      {courset.teacher}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>

          <div style={{ width: "450px" ,marginTop:'10px'}}>
            <div class="ResultTech-Text">ชื่อวิชา</div>
            <div
              class="ResultTechsearchBar-searchBoxSub"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                      value={searchText1}
                      onChange={handleSearchChangeCourse}
                      type="text"
                      placeholder="ชื่อวิชา"
                    />
                    <button onClick={searchCourses}>
                      <img src={searchIconCourse} alt="Search Icon" />
                    </button>
                    {searchResults1.length > 0 && (
                      <div className="autocomplete-dropdown">
                        {searchResults1
                        .filter((courset, index, self) =>
                        self.findIndex((n) => n.name === courset.name) === index
                        )
                        .map((courset, index) => (
                          <div
                            className="autocomplete-item"
                            key={index}
                            onClick={() => handleSelectCourse(courset)}
                          >
                            {courset.name}
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
                    onClick={() => {
                      if (selectedYear !=="") {
                        const filterData = allname.filter(item => 
                            item.course_year === selectedYear
                        );
                        setFilterresult(filterData);
                      }
                      if (searchText1 && searchText2) {
                        // กรณีที่มีการกรอกทั้งช่องค้นหาวิชาและชื่ออาจารย์
                        const filterData = allname.filter(item => 
                            item.name === searchText1 && item.teacher === searchText2
                        );
                        setFilterresult(filterData);
                      }else if (searchText1 && searchText2 && selectedDay) {
                          // กรณีที่มีการกรอกทั้งช่องค้นหาวิชา ชื่ออาจารย์ และวัน
                          const filterData = allname.filter(item => 
                              item.name === searchText1 && 
                              item.teacher === searchText2 &&
                              item.day === selectedDay
                          );
                          setFilterresult(filterData);
                      } else if (selectedDay && !searchText1 && !searchText2) {
                        // กรณีที่มีการเลือกวันเท่านั้น
                        const filterData = allname.filter(item => 
                            item.day === selectedDay
                        );
                        setFilterresult(filterData);
                      } else if (searchText1) {
                          // กรณีที่มีการกรอกเฉพาะช่องค้นหาวิชา
                          handlesearch({ target: { value: searchText1 } });
                      } else if (searchText2) {
                          // กรณีที่มีการกรอกเฉพาะช่องค้นหาชื่ออาจารย์
                          handlesearch({ target: { value: searchText2 } });
                      }
                      
                    }}
                >
                    <span
                        style={{ color: "white", fontSize: "16px", fontFamily: "Kanit" }}
                    >
                        {"search"}
                    </span>
                    <img
                        src={newSearchIcon}
                        alt="New Search Icon"
                        style={{ width: "16px", height: "16px" }}
                    />
                </button>
            )}
          </div>
        </div>

        <div>
          <div class="DateAdmin-textEdu">
            <p1>ผลการลงทะเบียนของอาจารย์ทั้งหมด</p1>{" "}
          </div>
          
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
                {searchTable?.length > 0 ? (
                    filterresult
                        .filter(filterName => (
                          searchText1 ? filterName.name.includes(searchText1) : true
                        ))
                        .filter(filterName => (
                          searchText2 ? filterName.teacher.includes(searchText2) : true
                        ))
                        .filter(filterName => (
                          selectedDay ? filterName.day.includes(selectedDay): true
                        ))  
                        .filter(filterName => (
                          selectedYear ? filterName.course_year === selectedYear : true
                        ))  
                        .filter(filterName => (
                          selectedRoom ? filterName.room === selectedRoom: true
                        ))
                        .filter(filterName => (
                          selectedTerm ? filterName.term === selectedTerm: true
                        ))   
              
                        
                        .map((filterName, index) => (
                            <tr key={index}>
                                <td>{`${index+1}`}</td>
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
                          searchText1 ? getcon.name.includes(searchText1) : true
                            
                        ))
                        .filter(getcon => (
                          searchText2 ? getcon.teacher.includes(searchText2) : true
                            
                        ))
                        .filter(getcon => (
                          selectedDay ? getcon.day.includes(selectedDay): true
                        )) 
                        .filter(getcon => (
                          selectedYear ? getcon.course_year === selectedYear : true
                        ))
                        .filter(filterName => (
                          searchText3 ? filterName.time_start.includes(searchText3) : true 
                        ))
                        .filter(getcon => (
                          selectedRoom ? getcon.room === selectedRoom : true
                        ))
                        .filter(getcon => (
                          selectedTerm ? getcon.term === selectedTerm : true
                        ))


                        .map((getcon, index) => (
                            <tr key={index}>
                                <td>{`${index+1}`}</td>
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
export default ResultRegisEdu;

