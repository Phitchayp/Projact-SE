import React, { useState } from 'react';
import './RoomImport.css';
import axios from 'axios';
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่

// function OtherPage() {
//   return (
//     <div>
//       <h2>หน้าอื่นๆ</h2>
//       {/* เพิ่มเนื้อหาหน้าอื่นๆ ที่นี่ */}
//     </div>
//   );
// }

function handleClick(event) {
  const button = event.currentTarget;

  // เพิ่ม animation class เมื่อคลิก
  button.classList.add('flash-animation');

  // ลบ animation class เมื่อ animation เสร็จสิ้น
  button.addEventListener('animationend', () => {
    button.classList.remove('flash-animation');
  });
}

function RoomImport() {
  return (
    <div className='turnleft-all'>
      <h className='DateAdmin-text'>นำข้อมูลห้องเรียนเข้าสู่ระบบ</h>
      <div className="course-table">
        <div className="column">
          <p>ปีการศึกษา/ภาคเรียน</p>
        </div>
        <div className="column">
          <div>
            <p>ห้องเรียน</p>
          </div>
        </div>
      </div>

      <div className="course-table1">
        <div className="column1">
          <p>2566/ต้น</p>
        </div>
        <div className="column2">
          {/* ใช้ Link เพื่อเปลี่ยนหน้า */}
          <Link to="/2566/ต้น" className="file-button" onClick={handleClick}>
            <FaFileLines style={{ fontSize: '35px',color:'black' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomImport;