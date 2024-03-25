import React, { useState } from 'react';
import './RoomImport.css';
import axios from 'axios';
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import UploadRoom from '../Wawa/Upload/UploadRoom';
import RoomList from '../components/getRoom';

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
  const tableData = [2569,2568,2567,2566, 2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 'ภาคต้น', 'ภาคปลาย', 'ภาคฤดูร้อน'];
  const [selectedValue8, setSelectedValue8] = useState('');
  const [selectedValue9, setSelectedValue9] = useState('');

  const handleDropdownChange8 = (event) => {
    setSelectedValue8(event.target.value);
  };

  const handleDropdownChange9 = (event) => {
    setSelectedValue9(event.target.value);
  };
  return (
    <div className='turnleft-all'>
      <h className='DateAdmin-text'>นำข้อมูลห้องเรียนเข้าสู่ระบบ</h>
      <div>
        <UploadRoom />
      </div>
      <h3 style={{ marginTop:'100px' ,color: '#8C3941' }}>ห้องเรียนที่เปิดสอน</h3>

      <div class="ListCourse-NewBox">
        <RoomList/>
      </div>
    </div>
  );
}

export default RoomImport;
