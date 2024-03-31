import React, { useState, useEffect } from 'react';
import CheckboxOpenCourse from '../componentsEdu/CheckboxOpenCourse'
import CloseRegis from '../pageTeacher/CloseRegis';
import '../pageTeacher/CloseRegis';
import { ReactComponent as Icon } from '../assets/warning.svg';


function OpenCourse() {
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


  ///////////////// api ///////////////

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


  return (

    <div>
    {apiResult === "pass" ? (
      
      <CheckboxOpenCourse/>
    ) : (
      <div className='turnleft-all' style={{ fontFamily:'kanit'}}>
            <div style={{color:'#CD5C5C' , fontSize:'15px'}}>
            <p2 style={{color:'#CD5C5C' , fontSize:'15px',fontFamily: 'kanit', fontWeight: 'bold'}}>{dateTime} </p2>
            </div>
            <div className='noti-text'>
                <Icon style={{ marginRight: '10px' }} />
                <span>ไม่อยู่ในกำหนดการเปิดรายวิชา</span>
            </div>
        </div>
    )}
  </div>
  
  );
}

export default OpenCourse;

