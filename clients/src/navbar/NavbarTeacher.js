import React ,{ useState } from 'react';
import './NavbarTeacher.css';
import { LuPencilLine } from "react-icons/lu";
import pen from '../assets/pen.svg';
import glass from '../assets/glass.svg';
import {Link} from 'react-router-dom'



const NavbarTeacher = () => {
  const [selectItem,setSelectItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectItem((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="profile.png" alt="" />
        <span>อาจารย์<br />: สมเกียรติ ใจดี</span>
      </div>
      <div className='nav-left'>
        <ul className="navbar-nav">
        <li className={`nav-item ${selectItem === 0 ? 'selected' : ''}` }onClick={() => handleItemClick(0)}>
            <img src="prakad.png" style={{ marginLeft: "20px" }}  alt="index" />
            <Link to ="/TeacherNoti" className="nav-link" >
              ประกาศ
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 1 ? 'selected' : ''}` }onClick={() => handleItemClick(1)}>
          <img src={pen} style={{ marginLeft: "20px" }}  alt="pen" />
            <Link to ="/RegisCourse" className="nav-link">
              ลงทะเบียนรายวิชา
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 2 ? 'selected' : ''}` }onClick={() => handleItemClick(2)}>
            <img src="folder.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to ="/RegisResultsTeacher" className="nav-link">
              ผลการลงทะเบียน
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 3 ? 'selected' : ''}` }onClick={() => handleItemClick(3)}>
            <img src="register.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to ="/CoursesTaughtTeacher" className="nav-link">
              รายวิชาที่สามารถเปิดสอน
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 4 ? 'selected' : ''}` }onClick={() => handleItemClick(4)}>
            <img src="classroom.png" style={{ marginLeft: "20px" }}  alt="user" />
            <Link to ="/AllRoomTeacher" className="nav-link">
              ห้องเรียนทั้งหมด
            </Link>
          </li>
          <li className={`nav-item ${selectItem === 5 ? 'selected' : ''}` }onClick={() => handleItemClick(5)}>
          <img src={glass} style={{ marginLeft: "20px" }}  alt="glass" />
            <Link to ="/CheckRegisResults" className="nav-link">
              ตรวจสอบผลการลงทะเบียน
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTeacher;
