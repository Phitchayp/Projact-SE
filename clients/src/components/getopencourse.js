import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './opencourse.css'

const CourseList = () => {
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

    return (
        <div>

            {courses.map((course) => (
                <div key={course.courseid} className='Course-Items-open'>
                    {/* <input type='checkbox' id={`checkText${course.courseid}`}/> */}
                    <div className='checkbox-text'>{` ${course.course_year}`}</div>
                    <div className='checkbox-text' style={{marginLeft: '10px'}}>{`${course.subject_id} `}</div>
                    <div className='checkbox-text' style={{marginLeft: '10px'}}>{`${course.subject_name}`}</div>
                    <div className='check-text2' >{`${course.credit}`}</div>
                    <div style={{marginRight: '20px'}}>{`${course.category}`}</div>


                    {/* <div className='CheckboxOpenCourse-status'>สถานะ:</div> */}
                </div>
            ))}

            
        </div>
    );
};

export default CourseList;



                    {/* <div className='checkbox-text'>{`${course.courseid}. ${course.course_year} ${course.subject_id} 
                    ${course.subject_name} ${course.credit} ${course.category}`}</div> */}
