import React, { useState } from 'react';
import './NavbarEdu.css';
import {Link} from 'react-router-dom'

const NavbarEdu = () => {
  const name = sessionStorage.getItem("name")
  const [selectItem,setSelectItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectItem((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="profile.png" alt="" />
        <span>ฝ่ายการศึกษา<br />: {name}</span>
      </div>
      <div className='nav-left'>
        <ul className="navbar-nav">
          <li className={`nav-item ${selectItem === 0 ? 'selected' : ''}` }onClick={() => handleItemClick(0)}>
            <img src="prakad.png" style={{ marginLeft: "20px" }} alt="index" />
            <Link to ="/EduNoti" className="nav-link">
              ประกาศ
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 1 ? 'selected' : ''}` }onClick={() => handleItemClick(1)}>
            <img src="folder.png" style={{ marginLeft: "20px" }}  alt="time" />
            <Link to="/RegisResults" className="nav-link">
              ผลการลงทะเบียน
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 2 ? 'selected' : ''}` }onClick={() => handleItemClick(2)}>
            <img src="import.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to="/CoursesTaught" className="nav-link">
              นำเข้ารายวิชา
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 3 ? 'selected' : ''}` }onClick={() => handleItemClick(3)}>
            <img src="register.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to="/OpenCourse" className="nav-link">
              รายวิชาที่สามารถเปิดสอน
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 4 ? 'selected' : ''}` }onClick={() => handleItemClick(4)}>
            <img src="classroom.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to="/AllRoom" className="nav-link">
              ห้องเรียนทั้งหมด
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarEdu;
