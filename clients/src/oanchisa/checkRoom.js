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
  return (
    <div className='turnleft-all'>
      <h3 style={{ marginTop:'100px' ,color: '#8C3941' ,fontFamily:'Kanit' }}>ห้องเรียนที่สามารถเปิดสอนได้ในปีการศึกษานี้</h3>

      <div>
        <RoomList/>
      </div>
    </div>
  );
}

export default RoomImport;
