import React, { useState } from 'react';
import './CheckboxOpenCourse.css';

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


    document.addEventListener("DOMContentLoaded", function () {
        // เพิ่มโค้ดที่ต้องการให้ทำงานหลังจากการโหลดหน้าเว็บเสร็จสมบูรณ์ที่นี่
        var saveButtonOpenCourse = document.getElementById('saveButton');



        if (saveButtonOpenCourse) {
            saveButtonOpenCourse.addEventListener('click', function () {
                console.log("คุณกำลังคลิกปุ่มบันทึก");
                // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
            });
        }

    });



    return (
        <div className='turnleft-all'>
            <div className='DateAdmin-text'>
                <h >เลือกรายวิชาที่สามารถเปิดสอน</h>
            </div>
            <div className='CheckboxOpenCourse-box'>
                <div className='CheckboxOpenCourse-dropdown' >
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


                        <div className="CheckboxOpenCourse-check-block">
                            <p >เลือกรายการ</p>
                            <div className='leftleft'>
                                <input type="checkbox" id="selectAll" checked={isChecked} onChange={handleCheckboxChange} />
                                <span className="CheckboxOpenCourse-checkbox-text">เลือกทั้งหมด</span>
                            </div>
                        </div>

                        <div class="CheckboxOpenCourse-NewBox">
                            <div>
                                <div>
                                    <div className='CheckboxOpenCourse-Item'>
                                        <input type='checkbox' id='checkText' />
                                        <p className='checkbox-text'>1. รหัสวิชา ชื่อวิชา หน่วยวิชา วิชาบังคับ/แกน/เลือก</p>
                                        <p className='checkbox-text CheckboxOpenCourse-status'>สถานะ:</p>
                                    </div>

                                    <div>
                                        <div className='CheckboxOpenCourse-Item'>
                                            <input type='checkbox' id='checkText2' />
                                            <p className='checkbox-text'>2. 65  03603111  Programming Fundamentals I  3(2-3-6)  วิชาแกน</p>
                                            <p className='checkbox-text CheckboxOpenCourse-status1'>สถานะ:</p>
                                        </div>
                                        <div>
                                            <div className='CheckboxOpenCourse-Item'>
                                                <input type='checkbox' id='checkText2' />
                                                <p className='checkbox-text'>3. 65	03603112	Programming Fundamentals II	3(2-3-6)	วิชาแกน</p>
                                                <p className='checkbox-text CheckboxOpenCourse-status2'>สถานะ:</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='CheckboxOpenCourse-Item'>
                                                <input type='checkbox' id='checkText2' />
                                                <p className='checkbox-text'>4. 65	03603171	Introduction to Computer Engineering and Informatics	3(3-0-6)	วิชาบังคับ</p>
                                                <p className='checkbox-text CheckboxOpenCourse-status3'>สถานะ:</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='CheckboxOpenCourse-Item'>
                                                <input type='checkbox' id='checkText2' />
                                                <p className='checkbox-text'>5. 65	03603352	Laws and Ethics in Information Technology	3(3-0-6)	วิชาบังคับ</p>
                                                <p className='checkbox-text CheckboxOpenCourse-status4'>สถานะ:</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='CheckboxOpenCourse-Item'>
                                                <input type='checkbox' id='checkText2' />
                                                <p className='checkbox-text'>6. 65	03603251	Database Systems	3(3-0-6)	วิชาบังคับ
                                                </p>
                                                <p className='checkbox-text CheckboxOpenCourse-status5'>สถานะ:</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='CheckboxOpenCourse-Item'>
                                                <input type='checkbox' id='checkText2' />
                                                <p className='checkbox-text'>7. 65	03603252	Database Systems Laboratory	1(0-3-2)	วิชาบังคับ</p>
                                                <p className='checkbox-text CheckboxOpenCourse-status6'>สถานะ:</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


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
        </div>

    );
}

export default CheckboxOpenCourse;