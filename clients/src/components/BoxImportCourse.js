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

    return (

        <div className='scrollable-content'>
            <div className='bg-gray'>
                <div className='turnleft-all'>

                    <div className="container">

                        {/* <div className="bottom-rectangle">
                            <r style={{ color: '#8C3941' }}>นำเข้ารายวิชา</r>
                            <g style={{ color: '#838383' }}>(*ครั้งละ 1 ไฟล์)</g>
                            <b style={{ color: '#000000', marginLeft: '126px' }}>ปีการศึกษา</b>
                            <b style={{ color: '#000000', marginLeft: '126px' }}>หลักสูตร</b>

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

                                <select style={{ marginleft: '30px' }}>
                                    <option value=""></option>
                                    <option value="70">70</option>
                                    <option value="65">65</option>
                                    <option value="60">60</option>
                                    <option value="55">55</option>
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
                                    <option value="1">(0-3-2)</option>
                                    <option value="2">(0-6-3)</option>
                                    <option value="3">(3-0-6)</option>
                                    <option value="4">(3-3-8)</option>
                                    <option value="5">1-3</option>
                                    <option value="6">1</option>
                                    <option value="7">2</option>
                                    <option value="8">6</option>
                                </select>
                            </div>
                            <div className='test'>
                                <UploadEdu
                                    selectedValue1={selectedValue1} />
                                <InputEdu
                                    selectedValue2={selectedValue2}
                                    selectedValue3={selectedValue3}
                                    selectedValue4={selectedValue4}
                                    reloadPage={reloadPageHandler} />
                            </div>
                            <w style={{ color: '#8C3941' }}>เพิ่มรายวิชา</w>
                            <t style={{ color: '#838383' }}>(*ครั้งละ 1 วิชา)</t>
                            <f style={{ color: '#000000' }}>หลักสูตร</f>
                            <a style={{ color: '#000000' }}>หมวดวิชา</a>
                            <c style={{ color: '#000000' }}>หน่วยกิต</c>

                            <div className='test'>

                            </div>
                 
                          
                        </div>  */}
                        <div>
                            <div className='DateAdmin-text'>
                                <h>นำข้อมูลรายวิชาเข้าสู่ระบบ</h>
                            </div>
                            <div className='container-boximport'>
                                <div className='backgroung-color22'>
                                    <r style={{ color: '#8C3941', marginLeft: '15px' }}>นำเข้ารายวิชา </r>
                                    <g style={{ color: '#838383' }}>  (*ครั้งละ 1 ไฟล์)</g>

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
                                            <select value={selectcourse} style={{ marginleft: '30px' } }  onChange={handleDropdownChange5}>
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
                                    <r style={{ color: '#8C3941', marginLeft: '15px' }}>เพิ่มรายวิชา </r>
                                    <g style={{ color: '#838383' }}>  (*ครั้งละ 1 วิชา)</g>
                                    <div className='container-inside' style={{ marginTop: '5px' }}>
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
                                            <select value={selectcourse1} style={{ marginleft: '30px' } }  onChange={handleDropdownChange6}>
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
                                                <option value="1">(0-3-2)</option>
                                                <option value="2">(0-6-3)</option>
                                                <option value="3">(3-0-6)</option>
                                                <option value="4">(3-3-8)</option>
                                                <option value="5">1-3</option>
                                                <option value="6">1</option>
                                                <option value="7">2</option>
                                                <option value="8">6</option>
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
                                        <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>หลักสูตร</p>
                                        <select>
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

                                        <button className='CheckboxOpenCourse-button'>เลือก</button>
                                        <div>
                                           

                                        </div>

                                    </div>

                                    <div className="CheckboxOpenCourse-NewBoxnew" style={{ marginTop: '35px' , backgroundColor:'#FAF0E6'}}>
                                    <CourseList></CourseList>
                                    </div>




                                </div>


                            </div>

                        </div>





                    </div>

                </div>

            </div>



        </div>

    );
}

export default BoxImportCourse;