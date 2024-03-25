import React, { useState, useEffect } from 'react';
import './CheckboxOpenCourse.css';
import CourseList from './getsubject';
import BoxShow from './BoxsTableShowsub';
import axios from 'axios';
import Swal from 'sweetalert2';
import OpenCourseList from '../components/getopencoursefinal';

function CheckboxOpenCourse() {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [listCheck, setListCheck] = useState([]);
    const [courses, setCourses] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isDataSaved, setDataSaved] = useState(false);

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

    // ทั้งหมด
    const handleCheckboxAllChange = (id, isChecked) => {
        setIsChecked(isChecked);
        if (isChecked) {
            // เพิ่มข้อมูลของทุกตัวในรายการ courses เข้าไปใน listCheck
            const selectedCourses = courses.map(course => ({
                course_year: course.course_year,
                id: course.subject_id,
                subjectName: course.subject_name,
                credit: course.credit,
                category: course.category
            }));
            setListCheck(selectedCourses);
        } else {
            setListCheck([]); // เมื่อยกเลิกเลือกทั้งหมด ให้ล้าง listCheck
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
                })
                .catch((error) => {
                    console.error('Error fetching course data:', error);
                });
        }
    };





    useEffect(() => {
        console.log("listCheck has been changed:", listCheck);
    }, [listCheck]);

    // ทีละอัน
    // const handleCheckboxChange = (id, isChecked) => {
    //     if (isChecked) {
    //         setListCheck(prevList => [...prevList, id]); // เพิ่ม id เข้าไปใน listCheck
    //     } else {
    //         setListCheck(prevList => prevList.filter(item => item !== id)); // ลบ id ออกจาก listCheck
    //     }
    // };

    const handleCheckboxChange = (coursedata) => {
        const { course_year, id, checked, subjectName, credit, category } = coursedata;
        if (checked) {
            setListCheck(prevList => [...prevList, { course_year, id, subjectName, credit, category }]);
        } else {
            setListCheck(prevList => prevList.filter(item => item.id !== id));
        }
    };

    // listCheck.forEach(item => {
    //     console.log(item.id); // แสดง subject_id
    //     console.log(item.subjectName); // แสดง subjectName
    //     console.log(item.credit); // แสดง credit
    //     console.log(item.category); // แสดง category
    // });

    const saveOpenCourse = async () => {
        try {
            await axios.post("http://127.0.0.1:3001/opencourse", {
                listCheck: listCheck,
            });
            console.log("Data posted successfully");

            Swal.fire({
                title: "บันทึกข้อมูลสำเร็จ!",
                text: "บันทึกรายวิชาที่สามารถเปิดสอน",
                icon: "success",
                customClass: {
                    popup: 'kanit-font',
                    header: 'kanit-font',
                    title: 'kanit-font',
                }
            });
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };



    return (
        <div className='turnleft-all'>
            <div className='DateAdmin-text'>
                <h style={{ color: '#8b0000' }}>เลือกรายวิชาที่สามารถเปิดสอน</h>
            </div>
            <div className='CheckboxOpenCourse-box'>
                <div className='CheckboxOpenCourse-dropdown' >
                    <p style={{ fontFamily: 'kanit', fontWeight: 'bold' }}>หลักสูตร</p>
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


                        <div className="CheckboxOpenCourse-check-block">
                            <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>เลือกรายการ</p>
                            <div className='leftleft'>

                                {/* All */}
                                <input type="checkbox" id="selectAll" checked={isChecked} onChange={() => handleCheckboxAllChange('selectAll', !isChecked)} />


                                <span className="CheckboxOpenCourse-checkbox-text" style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>เลือกทั้งหมด</span>
                            </div>
                        </div>
                        {/* ทีละอัน */}
                        <div class="CheckboxOpenCourse-NewBox" style={{ backgroundColor: '#dcccd4' }}>
                            {/* <CourseList courses={courses} setListCheck={setListCheck}></CourseList> */}
                            <div>
                                {courses.map((course) => (
                                    <div key={course.courseid} className='CheckboxOpenCourse-Item'>
                                        <input onChange={(e) => {
                                            handleCheckboxChange({
                                                id: course.subject_id,
                                                checked: e.target.checked,
                                                subjectName: course.subject_name,
                                                credit: course.credit,
                                                category: course.category,
                                                course_year: course.course_year // เพิ่ม course_year เข้าไปในอ็อบเจกต์
                                            });
                                        }} type='checkbox' id={`checkText${course.courseid}`} />


                                        <div key={course.courseid} className='Course-Items-open'>
                                            {/* <input type='checkbox' id={`checkText${course.courseid}`}/> */}
                                            <div className='checkbox-text'>{` ${course.course_year}`}</div>
                                            <div className='checkbox-text' style={{ marginLeft: '10px' }}>{`${course.subject_id} `}</div>
                                            <div className='checkbox-text' style={{ marginLeft: '10px' }}>{`${course.subject_name}`}</div>
                                            <div className='check-text2' >{`${course.credit}`}</div>
                                            <div style={{ marginRight: '20px' }}>{`${course.category}`}</div>


                                            {/* <div className='CheckboxOpenCourse-status'>สถานะ:</div> */}
                                        </div>
                                        {/* <div className='CheckboxOpenCourse-status'>สถานะ:</div> */}
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>

                <div>

                </div>

                <div class="CheckboxOpenCourse-changeButton">
                    <div class="RegisResultTable-saveButton">
                        <button id="saveButtonOpenCourse" onClick={() => saveOpenCourse(listCheck)}>
                            <p class="RegisResultTable-saveButtontext">บันทึก</p>
                        </button>
                    </div>

                </div>

            </div>
            <div>
                <div style={{ marginTop: '65px' }}>
                    <div className='DateAdmin-text'>
                        <h style={{ color: '#127151' }}>รายวิชาที่สามารถเปิดสอน</h>
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
        </div>

    );
}

export default CheckboxOpenCourse;