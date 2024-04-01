import React, { useState, useEffect } from 'react';
import './RoomImport.css';
import axios from 'axios';
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import UploadRoom from '../Wawa/Upload/UploadRoom';
import RoomList from '../components/getRoom';
import { ReactComponent as Icon } from '../assets/warning.svg';
import roomImport from '../assets/room_import.png';
import Swal from 'sweetalert2';

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
  const tableData = [2569, 2568, 2567, 2566, 2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 'ภาคต้น', 'ภาคปลาย', 'ภาคฤดูร้อน'];
  const [selectedValue8, setSelectedValue8] = useState('');
  const [selectedValue9, setSelectedValue9] = useState('');


  const [dateTime, setDateTime] = useState('');

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


  const handleDropdownChange8 = (event) => {
    setSelectedValue8(event.target.value);
  };

  const handleDropdownChange9 = (event) => {
    setSelectedValue9(event.target.value);
  };







  /////////// Api ดึงเวลาการใช้งานระบบของฝ่ายการศึกษาา ////////////
  const [apiResult, setApiResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/gettimeeducheck');
      const data = await response.text();
      setApiResult(data);
      console.log(apiResult);
    } catch (error) {
      console.error('Error fetching API:', error);
      setApiResult('error');
    }
  };

  useEffect(() => {
    // เรียก fetchData เมื่อ component โหลดเสร็จ
    fetchData();

    // เรียก fetchData ทุกๆ 1 นาที
    const interval = setInterval(fetchData, 30000);

    // ให้ clearInterval เมื่อ component unmount
    return () => clearInterval(interval);
  }, []);

  ////////////// ลิ้งรุป ////////////////////
  const handleLinkClick = () => {
    Swal.fire({
      title: 'ตัวอย่างไฟล์นำเข้า',
      text: 'ตึก , ห้อง , จำนวนคน',
      imageUrl: roomImport,
      imageWidth: 2000,
      imageHeight: 100,
      imageAlt: 'Example',
      confirmButtonText: 'ปิด',
      customClass: {
        title: 'kanit-font',
        content: 'kanit-font',
        confirmButton: 'kanit-font',
        cancelButton: 'kanit-font',
        popup: 'kanit-font'
      }
    });

  };

  //////////////////////////////////////////////




  return (
    <div className='turnleft-all'>
      <div>

        <div>
          {apiResult === "pass" ? (

            <div>
              <div>
                <h className='DateAdmin-text'>นำข้อมูลห้องเรียนเข้าสู่ระบบ</h>
                <br></br><p2 style={{ color: '#CD5C5C', fontSize: '15px', fontFamily: 'kanit', fontWeight: 'bold' }}>{dateTime} </p2>
              </div>
              <div className='container-boximport23'>

                <br></br>
                <h style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: '15px', fontFamily: 'kanit', marginLeft: '20px'  }} onClick={handleLinkClick}>ตัวอย่างไฟล์นำเข้า</h>
                <span style={{ fontFamily: 'kanit', fontSize: '14px', color: '#708090', fontWeight: 'bold', marginLeft: '5px' }}> (*ไฟล์นามสกุล .xlsx เท่านั้น)</span>
                <div style={{ marginTop: '40px' , marginLeft: '90px' }}>
                  <UploadRoom />
                </div>

              </div>
              <div>
                <h3 style={{ marginTop: '100px', fontFamily: 'kanit' }}>ห้องเรียนที่เปิดสอน</h3>
                <RoomList />
              </div>

            </div>


          ) : (
            <div>
              <div style={{ fontFamily: 'kanit' }}>
                <div style={{ color: '#CD5C5C', fontSize: '15px' }}>
                  <p2 style={{ color: '#CD5C5C', fontSize: '15px', fontFamily: 'kanit', fontWeight: 'bold' }}>{dateTime}</p2>
                </div>
                <div className='noti-text2'>
                  <Icon style={{ marginRight: '10px' }} />
                  <span>ไม่อยู่ในกำหนดการเพิ่มห้องเรียน</span>
                </div>
              </div>


              <div>
                <h3 style={{ marginTop: '50px', fontFamily: 'kanit' }}>ห้องเรียนที่เปิดสอน</h3>
                <RoomList />
              </div>

            </div>



          )}
        </div>


      </div>



    </div>
  );
}

export default RoomImport;
