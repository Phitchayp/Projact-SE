import React, { useState, useEffect } from "react";
import "./ResultTech.css";
import CheckRegisCoruse from "./CheckRegisCoruse";
import searchIcon from "../assets/searchbar.svg";
import TimePickerRe from "./TimepickerResultSearch";
import newSearchIcon from "../assets/newsearch.png";
import Axios from "axios";

 
function ResultTeach() {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedValue6, setSelectedValue6] = useState("");
  const [selectedValue10, setSelectedValue10] = useState("");
  const [selectedValue11, setSelectedValue11] = useState("");
  const [selectedValue12, setSelectedValue12] = useState("");
  const [selectedValue13, setSelectedValue13] = useState("");
  const [selectedValue5, setSelectedValue5] = useState("");
  const [SelectDay, setSelectDay] = useState("");

  const [allcountry, setAllcountry] = useState([]);
  const [filterresult, setFilterresult] = useState([]);
  const [serachcountry, setSearchcountry] = useState("");
  
  const handleDropdownSelectDay = (event) => {
    setSelectDay(event.target.value);
  };
  const handleDropdownChange5 = (event) => {
    setSelectedValue5(event.target.value);
  };

  const handleDropdownChange6 = (event) => {
    setSelectedValue6(event.target.value);
  };

  const handleDropdownChange10 = (event) => {
    setSelectedValue10(event.target.value);
  };
 
  const handleDropdownChange11 = (event) => {
    setSelectedValue11(event.target.value);
  };
 
  const handleDropdownChange12 = (event) => {
    setSelectedValue12(event.target.value);
  };
 
  const handleDropdownChange13 = (event) => {
    setSelectedValue13(event.target.value);
  };
 

  const handlesearch = (event) => {
    const search = event.target.value;
    console.log(search);
    setSearchcountry(search);
 
    if (search !== "") {
      const filterdata = allcountry.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilterresult(filterdata);
    } else {
      setFilterresult(allcountry);
    }
  };
 
  useEffect(() => {
    const getcountry = async () => {
      const getres = await fetch("http://localhost:3001/courset");
      const setcounty = await getres.json();
      //console.log(setcounty);
      setAllcountry(await setcounty);
    };
    getcountry();
  }, []);

  
  const handleAdvancedSearch = async() => {
      // Validate ว่าทุก dropdown และช่องค้นหาถูกกรอกหรือเลือกค่าหรือไม่
      if (selectedValue10 || selectedValue11 || selectedValue12 || selectedValue13 || searchText.trim() !== "") {
        setSearching(true);
        console.log("Advanced Searching...");    
      }
      try {
        const response = await Axios.get(
          `http://localhost:3001/search-nameajarn?query=${searchText}`);
        if (response.data.length === 0) {
          alert("ไม่พบข้อมูลชื่อผู้ใช้นี้ กรุณากรอกข้อมูลให้ถูกต้อง");
          // window.location.reload();
        }
        setSearchResults([response.data]);
      } catch (error) {
        console.error("Error searching nameajarn:", error);
      }finally {
        // เมื่อค้นหาเสร็จสิ้น ปิดการค้นหา
        setSearching(false);
      }
  };
 
 
  document.addEventListener("DOMContentLoaded", function () {
    // เพิ่มโค้ดที่ต้องการให้ทำงานหลังจากการโหลดหน้าเว็บเสร็จสมบูรณ์ที่นี่
    var searchButton = document.getElementById("searchButton");
  
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        var searchText = document.getElementById("searchInput").value.trim();
        console.log("คำค้นหา:", searchText);
        // ทำสิ่งที่ต้องการกับ searchText ที่ได้รับจากผู้ใช้
      });
    }
  
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults1, setSearchResults1] = useState([]);
 
  const searchNameAjarn = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/search-nameajarn?query=${searchText}`
      );
      setSearchResults1(response.data); // อัปเดต state ด้วยข้อมูลผลการค้นหา
    } catch (error) {
      console.error("Error searching nameajarn:", error);
    }
  };
 
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchNameAjarn();
    } else {
      setSearchResults1([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };
 
  const [selectedName, setSelectedName] = useState({
    name: "",
  });
  const handleSelectName = (usersaj) => {
    setSearchText(`${usersaj.name}`);
    setSelectedName({
      name: usersaj.name,
    });
    setSearchResults1([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือก
  };
 
  return (
    <div className="top" style={{ marginBottom:'30px' }}>
      <h className="DateAdmin-text">ผลการลงทะเบียน</h>
      <div style={{ marginTop: '25px' }}>
        <div>
 
          <a>ปีการศึกษา</a>
          <a style={{marginLeft:'-25px'}}>ภาคการศึกษา</a>
          <a style={{marginLeft:'-55px'}}>ชั้นปี</a>
          <a>ห้อง</a>
          <a>สาขา</a>
          
 
          <div className="dropdown">
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
                <option value="ทั้งหมด">ทั้งหมด</option>
              </select>
            </div>

            <div className="dropdown11">
              <select value={selectedValue11} onChange={handleDropdownChange11}>
                <option value=""></option>
                <option value="year1">ปี 1</option>
                <option value="year2">ปี 2</option>
                <option value="year3">ปี 3</option>
                <option value="year4">ปี 4</option>
                <option value="year5">ปี 5-8</option>
              </select>
            </div>
            <div className="dropdown12">
              <select value={selectedValue12} onChange={handleDropdownChange12}>
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
            <div className="dropdown13" style={{marginLeft:'65px'}}>
              <select value={selectedValue13} onChange={handleDropdownChange13}>
                <option value=""></option>
                <option value="T05">T05</option>
                <option value="T12">T12</option>
                <option value="T13">T13</option>
                <option value="T14">T14</option>
                <option value="T17">T17</option>
                <option value="T18">T18</option>
                <option value="T19">T19</option>
                <option value="T20">T20</option>
                <option value="T21">T21</option>
                <option value="T22">T22</option>
                <option value="T23">T23</option>
              </select>
            </div>
          </div>
        </div>
 
        <div className="ChangePosition2">
          <div style={{ width: "265px" }}>
            <div class="ResultTech-Text">ชื่อผู้สอน</div>
            <div
              class="ResultTechsearchBar-searchBox"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                value={searchText}
                onChange={handleSearchChange}
                type="text"
                placeholder="ชื่อผู้สอน"
              />
              <button onClick={searchNameAjarn}>
                <img src={searchIcon} alt="Search Icon" />
              </button>
              {searchResults1.length > 0 && (
                <div className="autocomplete-dropdown">
                  {searchResults1.map((usersaj, index) => (
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
          
          <div className="ChangePosition3" style={{marginLeft:'-34px'}}>
          <div style={{marginTop:'0px',marginLeft:'-10px'}}>
            <a style={{marginLeft:'60px'}}>วัน</a>
            <div className="dropdownDay" style={{marginTop:'10px',marginLeft:'-10px'}}>
            <select value={SelectDay} onChange={handleDropdownSelectDay} style={{ height: '35px' }}>
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
          </div>
 
          <div style={{marginLeft:'-25px'}}>
            <div class="ResultTech-Text">เวลาเริ่มต้น</div>
            <TimePickerRe></TimePickerRe>
          </div>
 
          <div>
            <div class="ResultTech-Text">เวลาสิ้นสุด</div>
            <TimePickerRe></TimePickerRe>
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
                      value={searchText}
                  onChange={handlesearch}
                  type="text"
                  placeholder="ชื่อผู้สอน"
                  onClick={(e) => {
                    handlesearch(e);
                  }}>
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
          </div>
        </div>
  );
}
 
               
      // <div style={{ marginTop: '25px' }}>
      //   <div className="ChangePosition">
      //   {/* <Search></Search> */}
      //     {/* <CheckRegisCoruse></CheckRegisCoruse> */}
      //     <Search></Search>
      //    </div>
      //   </div>
 
export default ResultTeach;