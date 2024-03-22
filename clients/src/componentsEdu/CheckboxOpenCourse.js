import React, { useState, useEffect } from 'react';
import './CheckboxOpenCourse.css';
import CourseList from './getsubject';
import BoxShow from './BoxsTableShowsub';
import Axios from 'axios';

function CheckboxOpenCourse() {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            // เมื่อติ๊กที่ "เลือกทั้งหมด"
            const allItemIds = document.querySelectorAll('.CheckboxOpenCourse-Item input[type="checkbox"]').forEach(checkbox => checkbox.checked = true);
            setSelectedItems(allItemIds);
        } else {
            // เมื่อยกเลิกติ๊กที่ "เลือกทั้งหมด"
            const allItemIds = document.querySelectorAll('.CheckboxOpenCourse-Item input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            setSelectedItems([]);
        }
    };

    const handleItemCheckboxChange = (e) => {
        const itemId = e.target.id;
        if (e.target.checked) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemId]);
        } else {
            setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
        }
    };

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:3001/getsub")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, []);


    const [myyear, setYear] = useState("");

    const search =() => {
        if(myyear===""){
            alert("กรุณา")
        
        }else{
            Axios.get("http://127.0.0.1:3001/getsubsearch/"+ myyear)
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });

            
        } 
    
    }


    const [listCheck, setListCheck] = useState([]);


    useEffect(() => {
        console.log("listCheck has been changed:", listCheck);
      }, [listCheck]);






    return (
        <div className='turnleft-all'>
            <div className='DateAdmin-text'>
                <h >เลือกรายวิชาที่สามารถเปิดสอน</h>
            </div>
            <div className='CheckboxOpenCourse-box'>
                <div className='CheckboxOpenCourse-dropdown' >
                    <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>หลักสูตร</p>
                    <select value={myyear} onChange={(e)=>{setYear(e.target.value)}}>
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

                    <button onClick={()=>{search()}} className='CheckboxOpenCourse-button'>เลือก</button>



                    <div>


                        <div className="CheckboxOpenCourse-check-block">
                            <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>เลือกรายการ</p>
                            <div className='leftleft'>
                                <input type="checkbox" id="selectAll" checked={isChecked} onChange={handleCheckboxChange} />
                                <span className="CheckboxOpenCourse-checkbox-text" style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>เลือกทั้งหมด</span>
                            </div>
                        </div>

                        <div class="CheckboxOpenCourse-NewBox">
                            <CourseList courses={courses} setListCheck={setListCheck}></CourseList>

                            {/* <div>
                                    <div className='CheckboxOpenCourse-Item'>
                                        <input type='checkbox' id='checkText' />
                                        <div className='checkbox-text'>1. รหัสวิชาss ชื่อวิชา หน่วยวิชา วิชาบังคับ/แกน/เลือก</div>
                                        <div className='CheckboxOpenCourse-status'>สถานะ:</div>
                                    </div>


                                </div> */}


                        </div>


                    </div>

                </div>

                <div>

                </div>

                <div class="CheckboxOpenCourse-changeButton">
                    <div class="RegisResultTable-saveButton">
                        <button id="saveButtonOpenCourse">
                            <p class="RegisResultTable-saveButtontext">บันทึก</p></button>
                    </div>

                </div>

            </div>
            <BoxShow/>
        </div>

    );
}

export default CheckboxOpenCourse;
