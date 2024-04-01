import React, { useState, useEffect } from 'react';
import './BoxImportCourse.css'; // นี่คือไฟล์ CSS ของคุณ
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import UploadEdu from '../Wawa/Upload/UploadEdu';
import InputEdu from '../Wawa/Input/InputEdu';

import CourseList from './getopencourse';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../pageTeacher/CloseRegis';
import { ReactComponent as Icon } from '../assets/warning.svg';
import courseImport from '../assets/course_import.png';




function handleClick(event) {
    const button = event.currentTarget;

    // เพิ่ม animation class เมื่อคลิก
    button.classList.add('flash-animation');

    // ลบ animation class เมื่อ animation เสร็จสิ้น
    button.addEventListener('animationend', () => {
        button.classList.remove('flash-animation');
    });
}


function BoxImportCourse() {
    // สร้างข้อมูลตาราง
    const tableData = [2569, 2568, 2567, 2566, 2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 'วิชาบังคับ', 'วิชาเลือก', 'วิชาแกน', 1, 2, 3, 4];
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');
    const [selectedValue4, setSelectedValue4] = useState('');
    const [selectcourse, setselectcourse] = useState('');
    const [selectcourse1, setselectcourse1] = useState('');
    const [reloadPage, setReloadPage] = useState(false); // เพิ่ม state เพื่อให้ BoxImportCourse ทำการรีเฟรชหน้าเว็บ

    const reloadPageHandler = () => {
        window.location.reload()
    };

    const handleDropdownChange1 = (event) => {
        setSelectedValue1(event.target.value);
    };

    // ////////////////////////////////////////////////////////////////
    const handleDropdownChange2 = (event) => {
        setSelectedValue2(event.target.value);
    };

    const handleDropdownChange3 = (event) => {
        setSelectedValue3(event.target.value);
    };
    const handleDropdownChange4 = (event) => {
        setSelectedValue4(event.target.value);
    };
    const handleDropdownChange5 = (event) => {
        setselectcourse(event.target.value);
    };
    const handleDropdownChange6 = (event) => {
        setselectcourse1(event.target.value);
    };

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

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:3001/getsub")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, []);

    const [myyear, setYear] = useState("");

    const search = () => {
        if (myyear === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "กรุณาเลือกปีการศึกษา",
                customClass: {
                    popup: 'kanit-font',
                    header: 'kanit-font',
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    footer: 'kanit-font'
                }
            });
        } else {
            axios.get("http://127.0.0.1:3001/getsubsearch/" + myyear)
                .then((response) => {
                    setCourses(response.data);
                    console.log("หลักสูตร" + myyear)

                })
                .catch((error) => {
                    console.error('Error fetching course data:', error);
                });
        }
    };

    ////////////// ลิ้งรุป ////////////////////
    const handleLinkClick = () => {
        Swal.fire({
            title: 'ตัวอย่างไฟล์นำเข้า',
            text: 'รหัสวิชา , ชื่อวิชา , หน่วยกิต , หมวดวิชา',
            imageUrl: courseImport,
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






    return (

        <div className='scrollable-content'>
            <div className='bg-gray'>
                <div className='turnleft-all'>

                    <div className="container">

                        <div>
                            {apiResult === "pass" ? (

                                <div>
                                    <div>
                                        <div className='DateAdmin-text'>
                                            <h>นำข้อมูลรายวิชาเข้าสู่ระบบ</h>
                                            <br></br><p2 style={{ color: '#CD5C5C', fontSize: '15px' }}>{dateTime}</p2>
                                        </div>
                                        <div className='container-boximport' style={{ marginTop: '20px' }} >
                                            <div className='backgroung-color22'>
                                                <r style={{ color: '#8C3941', marginLeft: '15px', fontWeight: 'bold' }}>นำเข้ารายวิชา </r>
                                                <g style={{ color: '#838383' }}>  (*ครั้งละ 1 ไฟล์และไฟล์นามสกุล .xlsx เท่านั้น)</g>



                                                <br></br>
                                                <h style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' , fontSize:'15px' , marginLeft: '15px'}} onClick={handleLinkClick}>ตัวอย่างไฟล์นำเข้า</h>




                                                <div className='container-inside' style={{ marginTop: '5px', marginLeft: '40px' }}>
                                                    <div>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>ปีการศึกษา</b>
                                                        <br />
                                                        <select value={selectedValue1} onChange={handleDropdownChange1}>
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
                                                    <div style={{ marginLeft: '50px' }}>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>หลักสูตร</b>
                                                        <br />
                                                        <select value={selectcourse} style={{ marginleft: '30px' }} onChange={handleDropdownChange5}>
                                                            <option value=""></option>
                                                            <option value="70">70</option>
                                                            <option value="65">65</option>
                                                            <option value="60">60</option>
                                                            <option value="55">55</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <UploadEdu
                                                    selectedValue1={selectedValue1}
                                                    selectcourse={selectcourse} />



                                            </div>
                                            <div className='backgroung-color23'>
                                                <r style={{ color: '#8C3941', marginLeft: '15px', fontWeight: 'bold' }}>เพิ่มรายวิชา </r>
                                                <g style={{ color: '#838383' }}>  (*ครั้งละ 1 วิชา)</g>
                                                <div className='container-inside' style={{ marginTop: '30px' }}>
                                                    <div style={{ marginLeft: '40px' }}>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>ปีการศึกษา</b>
                                                        <br />
                                                        <select value={selectedValue2} onChange={handleDropdownChange2}>
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
                                                    <div style={{ marginLeft: '25px' }}>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>หลักสูตร</b>
                                                        <br />
                                                        <select value={selectcourse1} style={{ marginleft: '30px' }} onChange={handleDropdownChange6}>
                                                            <option value=""></option>
                                                            <option value="70">70</option>
                                                            <option value="65">65</option>
                                                            <option value="60">60</option>
                                                            <option value="55">55</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ marginLeft: '25px' }}>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>หมวดวิชา</b>
                                                        <br />
                                                        <select value={selectedValue3} onChange={handleDropdownChange3}>
                                                            <option value=""></option>
                                                            <option value="วิชาบังคับ">วิชาบังคับ</option>
                                                            <option value="วิชาเลือก">วิชาเลือก</option>
                                                            <option value="วิชาแกน">วิชาแกน</option>
                                                        </select>


                                                    </div>
                                                    <div style={{ marginLeft: '25px' }}>
                                                        <b style={{ color: '#000000', fontSize: '14px' }}>หน่วยกิต</b>
                                                        <br />
                                                        <select value={selectedValue4} onChange={handleDropdownChange4}>
                                                            <option value=""></option>
                                                            <option value="1(0-2-1)">1(0-2-1)</option>
                                                            <option value="1(0-3-2)">1(0-3-2)</option>
                                                            <option value="1(0-3-6)">1(0-3-6)</option>
                                                            <option value="2(0-6-3)">2(0-6-3)</option>
                                                            <option value="2(2-0-4)">2(2-0-4)</option>
                                                            <option value="3(3-0-6)">3(3-0-6)</option>
                                                            <option value="3(2-3-6)">3(2-3-6)</option>
                                                            <option value="4(3-3-8)">4(3-3-8)</option>
                                                            <option value="1-3">1-3</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <InputEdu
                                                    selectedValue2={selectedValue2}
                                                    selectedValue3={selectedValue3}
                                                    selectedValue4={selectedValue4}
                                                    selectcourse1={selectcourse1}
                                                    reloadPage={reloadPageHandler} />

                                            </div>

                                        </div>

                                    </div>

                                    <div style={{ marginTop: '65px' }}>
                                        <div className='DateAdmin-text'>
                                            <h >รายวิชาที่นำเข้า</h>
                                        </div>
                                        <div className='CheckboxOpenCourse-boxOpensub' style={{ marginTop: '18px' }}>
                                            <div className='CheckboxOpenCourse-dropdown'>
                                                {/*                             
                                <p2 style={{ fontFamily: 'Kanit, sans-serif' }}>หลักสูตร</p2> */}
                                                <div className='CheckboxOpenCourse-dropdown2' >
                                                    <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ปีการศึกษา</p>
                                                    <select value={myyear} onChange={(e) => { setYear(e.target.value) }}>
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

                                                    <button onClick={() => { search() }} className='CheckboxOpenCourse-button'>เลือก</button>
                                                    <div>


                                                    </div>

                                                </div>

                                                <div className="CheckboxOpenCourse-NewBoxnew" style={{ marginTop: '35px', backgroundColor: '#FAF0E6' }}>
                                                    <CourseList B={courses} />
                                                </div>




                                            </div>




                                        </div>

                                    </div>




                                </div>


                            ) : (



                                <div style={{ marginTop: '65px' }}>
                                    <div>
                                        <div style={{ fontFamily: 'kanit' }}>
                                            <div style={{ color: '#CD5C5C', fontSize: '15px' }}>
                                                <p2 style={{ color: '#CD5C5C', fontSize: '15px', fontFamily: 'kanit', fontWeight: 'bold' }}>{dateTime} </p2>
                                            </div>
                                            <div className='noti-text'>
                                                <Icon style={{ marginRight: '10px' }} />
                                                <span>ไม่อยู่ในกำหนดการเพิ่มรายวิชา</span>
                                            </div>
                                        </div>



                                    </div>






                                    <div className='DateAdmin-text' style={{ marginTop: '65px' }}>
                                        <h >รายวิชาที่นำเข้า</h>
                                    </div>
                                    <div className='CheckboxOpenCourse-boxOpensub' style={{ marginTop: '18px' }}>
                                        <div className='CheckboxOpenCourse-dropdown'>
                                            {/*                             
                                <p2 style={{ fontFamily: 'Kanit, sans-serif' }}>หลักสูตร</p2> */}
                                            <div className='CheckboxOpenCourse-dropdown2' >
                                                <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ปีการศึกษา</p>
                                                <select value={myyear} onChange={(e) => { setYear(e.target.value) }}>
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

                                                <button onClick={() => { search() }} className='CheckboxOpenCourse-button'>เลือก</button>
                                                <div>


                                                </div>

                                            </div>

                                            <div className="CheckboxOpenCourse-NewBoxnew" style={{ marginTop: '35px', backgroundColor: '#FAF0E6' }}>
                                                <CourseList B={courses} />
                                            </div>




                                        </div>




                                    </div>

                                </div>
                            )}
                        </div>













                    </div>

                </div>

            </div>



        </div>

    );
}

export default BoxImportCourse;