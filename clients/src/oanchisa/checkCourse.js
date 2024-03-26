import React from 'react';
import './RoomImport.css'; // นี่คือไฟล์ CSS ของคุณ
import { FaFileLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // เพิ่มการนำเข้า Link ที่นี่
import OpenCourseList from '../components/getopencoursefinal';


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
    // สร้างข้อมูลตาราง
    const tableData = [2566, 2565, 2564, 2563];
    return (
        <div className='turnleft-all'>
            <h className='DateAdmin-text'>ตรวจสอบรายวิชาที่สามารถเปิดสอน</h>
            <div>
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
                                <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold', marginBottom: '30px' }}>รายวิชาที่อาจารย์สามารถลงทะเบียน</p>

                            </div>

                        </div>

                        <div className="CheckboxOpenCourse-NewBox" style={{ marginTop: '35px' }}>
                            <OpenCourseList></OpenCourseList>

                        </div>




                    </div>


                </div>


            </div>
        </div>




        // <div className="course-table">
        //                         <div className="column">
        //                             <p>หลักสูตร</p>

        //                         </div>
        //                         <div className="column">
        //                             <div>
        //                                 <p>รายวิชาที่เปิดสอน</p>
        //                             </div>

        //                         </div>
        //                     </div>


        //                     <div className="course-table1">
        //                         <div className="column1">
        //                             <p>2566</p>

        //                         </div>
        //                         <div className="column2">
        //                         <Link to="/หลักสูตรปี_66" className="file-button" onClick={handleClick}>
        //                             <FaFileLines style={{ fontSize: '35px',color:'black' ,marginLeft:'110px'}} />
        //                         </Link>

        //                         </div>
        //                     </div>

        //                     <div className="course-table2">
        //                         <div className="column3">
        //                             <p>2565</p>

        //                         </div>
        //                         <div className="column4">
        //                         <Link to="/หลักสูตรปี_65" className="file-button" onClick={handleClick}>
        //                             <FaFileLines style={{ fontSize: '35px',color:'black',marginLeft:'110px' }} />
        //                         </Link>

        //                         </div>
        //                     </div>

        //                     <div className="course-table3">
        //                         <div className="column5">
        //                             <k>2564</k>

        //                         </div>
        //                         <div className="column6">
        //                         <Link to="/หลักสูตรปี_64" className="file-button" onClick={handleClick}>
        //                             <FaFileLines style={{ fontSize: '35px',color:'black',marginLeft:'110px' }} />
        //                         </Link>

        //                         </div>
        //                     </div>
        //                     <div className="course-table4">
        //                         <div className="column7">
        //                             <p>2563</p>

        //                         </div>
        //                         <div className="column8">
        //                         <Link to="/หลักสูตรปี_63" className="file-button" onClick={handleClick}>
        //                             <FaFileLines style={{ fontSize: '35px',color:'black',marginLeft:'110px' }} />
        //                         </Link>

        //                         </div>
        //                     </div>


    );
}

export default CheckCourse;
