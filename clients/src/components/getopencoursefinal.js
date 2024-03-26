import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './opencourse.css'
import { LuDelete } from "react-icons/lu";

const OpenCourseList =({A}) =>{
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

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteopencourse/${courseId}`);
            setCourses2(prevCourses => prevCourses.filter(course => course.courseid !== courseId));
            window.location.reload(); // Reload the page after successful deletion
        } catch (error) {
            console.error('Error deleting data:', error);
            alert(`ลบข้อมูลไม่สำเร็จ`);
        }
    };

    return (
        <div>
            {A.map((course) => (
                <div key={course.courseid} className='Course-Items-open'>
                    <div className='checkbox-text'>{` ${course.course_year}`}</div>
                    <div className='checkbox-text' style={{ marginLeft: '10px' }}>{`${course.subject_id} `}</div>
                    <div className='checkbox-text' style={{ marginLeft: '10px' }}>{`${course.subject_name}`}</div>
                    <div className='check-text2' >{`${course.credit}`}</div>
                    <div style={{ marginRight: '20px' }}>{`${course.category}`}</div>
                    <LuDelete style={{ fontSize: '24px' }}
                        onClick={() => {
                            if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลรายวิชา : ${course.subject_name} ออกจากระบบ?`)) {
                                handleDeleteCourse(course.courseid);
                            }
                        }} />
                </div>
            ))}
        </div>
    );
};

export default OpenCourseList;
