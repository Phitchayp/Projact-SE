import React, { useState, useEffect } from 'react';
import './RoomImport.css'; // นี่คือไฟล์ CSS ของคุณ
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import OpenCourseList from '../components/getopencoursefinal';
import OpenCourseListTeacher from '../components/getopencourseTeacher';
import axios from 'axios';
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

function CheckCourse() {


    const [courses2, setCourses2] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/getOpenCourseList")
            .then((response) => {
                setCourses2(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, []);

    const [myyear2, setYear2] = useState("");
    const [termsearch, setTerm] = useState("");
    const search2 = () => {
        if (myyear2 === "" || termsearch === "") {
            // ถ้า myyear2 หรือ termseach ว่าง ให้แสดงข้อความแจ้งเตือนและไม่ทำอะไรเพิ่ม
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "กรุณาเลือกปีการศึกษาและเทอม",
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
            // ถ้า myyear2 และ termseach ไม่ว่าง ให้ส่ง request ไปยัง API ตามปีการศึกษาและเทอมที่เลือก
            axios.get("http://127.0.0.1:3001/getsubsearch1/" + myyear2 + "/" + termsearch)
                .then((response) => {
                    setCourses2(response.data);
                    console.log("เปิดสอน" + myyear2 + "เทอม" + termsearch); // แสดงปีการศึกษาและเทอมที่เลือก
                })
                .catch((error) => {
                    console.error('Error fetching course data:', error);
                });
        }
    };






    // สร้างข้อมูลตาราง
    const tableData = [2566, 2565, 2564, 2563];
    return (
        <div className='turnleft-all'>

            <h className='DateAdmin-text'>ตรวจสอบรายวิชาที่สามารถเปิดสอน</h>
            <div className='CheckboxOpenCourse-boxOpensub'>
                <div className='CheckboxOpenCourse-dropdown'>
                    {/*                             
        <p2 style={{ fontFamily: 'Kanit, sans-serif' }}>หลักสูตร</p2> */}
                    <div className='CheckboxOpenCourse-dropdown2' >
                        <div>
                            <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ปีการศึกษา</p>
                            <select value={myyear2} onChange={(e) => { setYear2(e.target.value) }}>
                                <option value=""></option>
                                <option value="2574">2574</option>
                                <option value="2573">2573</option>
                                <option value="2572">2572</option>
                                <option value="2571">2571</option>
                                <option value="2570">2570</option>
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
                        <div style={{ marginLeft: '100px', marginTop: '-8.3%' }}>
                            <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>ภาคเรียน</p>
                            <select value={termsearch} onChange={(e) => { setTerm(e.target.value) }}>
                                <option value=""></option>
                                <option value="ภาคต้น">ภาคต้น</option>
                                <option value="ภาคปลาย">ภาคปลาย</option>
                                <option value="ทั้งหมด">ทั้งหมด</option>
                            </select>
                            <button onClick={() => { search2() }} className='CheckboxOpenCourse-button'>เลือก</button>
                        </div>



                    </div>

                    <div>
                        <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold', marginBottom: '50px', marginTop: '30px' }}>รายวิชาที่อาจารย์สามารถลงทะเบียน</p>

                    </div>

                </div>

                <div className="CheckboxOpenCourse-NewBox" style={{ marginTop: '40px', marginLeft: '60px' }}>
                    <OpenCourseListTeacher A={courses2} />

                </div>




            </div>


        </div>

    );
}

export default CheckCourse;
