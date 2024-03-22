import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const CourseList = ({courses , setListCheck }) => {

    // const [courses, setCourses] = useState([]);

    // useEffect(() => {
    //     Axios.get("http://127.0.0.1:3001/getsub")
    //         .then((response) => {
    //             setCourses(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching course data:', error);
    //         });
    // }, []);

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
          setListCheck(prevList => [...prevList, id]); // เพิ่ม id เข้าไปใน listCheck
        } else {
          setListCheck(prevList => prevList.filter(item => item !== id)); // ลบ id ออกจาก listCheck
        }
      };



    return (
        <div>


            {courses.map((course) => (
                <div key={course.courseid} className='CheckboxOpenCourse-Item'>
                    <input onChange={(e)=>{handleCheckboxChange(course.subject_id,e.target.checked)} } type='checkbox' id={`checkText${course.courseid}`}/>
                    <div className='checkbox-text'>{`${course.courseid}. ${course.course_year}`}</div>
                    <div className='checkbox-text' style={{marginLeft: '10px'}}>{`${course.subject_id} `}</div>
                    <div className='checkbox-text' style={{marginLeft: '10px'}}>{`${course.subject_name}`}</div>
                    <div className='checkbox-text'style={{marginLeft: '10px'}} >{`${course.credit}`}</div>
                    <div className='checkbox-text'>{`${course.category}`}</div>


                    <div className='CheckboxOpenCourse-status'>สถานะ:</div>
                </div>
            ))}

            
        </div>
    );
};

export default CourseList;



                    {/* <div className='checkbox-text'>{`${course.courseid}. ${course.course_year} ${course.subject_id} 
                    ${course.subject_name} ${course.credit} ${course.category}`}</div> */}
