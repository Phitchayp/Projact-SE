import React, { useState } from 'react';
import './BoxImportCourse.css'; // นี่คือไฟล์ CSS ของคุณ
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import UploadEdu from '../Wawa/Upload/UploadEdu';
import InputEdu from '../Wawa/Input/InputEdu';
import CourseList from './getopencourse';


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

    return (

        <div className='scrollable-content'>
            <div className='bg-gray'>
                <div className='turnleft-all'>
                    <div className='DateAdmin-text'>
                        <h>นำข้อมูลรายวิชาเข้าสู่ระบบ</h>
                    </div>

                    <div className="container">
                        <div className="top-left">
                            <p>นำข้อมูลรายวิชาเข้าสู่ระบบ</p>
                        </div>
                        <div className="bottom-rectangle">
                            <r style={{ color: '#8C3941' }}>นำเข้ารายวิชา</r>
                            <g style={{ color: '#838383' }}>(*ครั้งละ 1 ไฟล์)</g>
                            <b style={{ color: '#000000' }}>หลักสูตร</b>
                            <div className='dropdown1'>
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
                            <div className='dropdown2'>
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
                            <div className='dropdown3'>
                                <select value={selectedValue3} onChange={handleDropdownChange3}>
                                    <option value=""></option>
                                    <option value="วิชาบังคับ">วิชาบังคับ</option>
                                    <option value="วิชาเลือก">วิชาเลือก</option>
                                    <option value="วิชาแกน">วิชาแกน</option>
    

                                </select>
                            </div>
                            <div className='dropdown4'>
                                <select value={selectedValue4} onChange={handleDropdownChange4}>
                                    <option value=""></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>

                                </select>
                            </div>
                            <div className='test'>
                                <UploadEdu
                                    selectedValue1={selectedValue1} />
                                <InputEdu
                                    selectedValue2={selectedValue2}
                                    selectedValue3={selectedValue3}
                                    selectedValue4={selectedValue4} />
                            </div>
                            <w style={{ color: '#8C3941' }}>เพิ่มรายวิชา</w>
                            <t style={{ color: '#838383' }}>(*ครั้งละ 1 วิชา)</t>
                            <f style={{ color: '#000000' }}>หลักสูตร</f>
                            <a style={{ color: '#000000' }}>หมวดวิชา</a>
                            <c style={{ color: '#000000' }}>หน่วยกิต</c>

                            {/* <x style={{ color: '#000000' }}>รหัสวิชา</x>
                            <y style={{ color: '#000000' }}>ชื่อวิชา</y> */}
                            <div className='test'>

                            </div>

                            <div style={{ marginTop:'100px'}}>

                            <h3 style={{ color: '#8C3941'}}>รายวิชาที่เปิดสอน</h3>
                            </div>

                        </div> {/* เพิ่มกล่องสี่เหลี่ยม */}

                        <div class="ListCourse-NewBox">
                            <CourseList></CourseList>
                        
                        </div>


                        
                    </div>

                </div>

            </div>



        </div>

    );
}

export default BoxImportCourse;