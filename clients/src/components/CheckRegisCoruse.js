import React, { useState, useEffect } from 'react';
import './CheckRegisCoruse.css'; // Import CSS file for table styling
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Axios from 'axios';

const ListCoruse = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
      Axios.get("http://localhost:3001/course")
          .then((response) => {
              setCourse(response.data);
          })
          .catch((error) => {
              console.error('Error fetching course data:', error);
          });
  }, []);
    return (
      <div className='CheckRegisCoruse-right'>
        {/* ตารางผลการลงทะเบียน */}
        <header className="CheckRegisCoruse-Texthead">
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="ผลการลงทะเบียน"
                    sheet="ผลการลงทะเบียน"
                    buttonText="EXPORT TO EXCEL"/>
          <table className="CheckRegisCoruse-bordered-table" id="table-to-xls">
            <thead>
              <tr>
                <th>No.</th>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>นก.</th>
                <th>lab/lec</th>
                <th>sec</th>
                <th>ชื่อผู้สอน</th>
                <th>จำนวนนิสิต</th>
                <th>ชั้นปี</th>
                <th>วัน</th>
                <th>เวลา</th>
                <th>ห้องlab</th>
              </tr>
            </thead>
            {course.map((course) => (
            <tbody>
              <tr key={course.id}>
                <td>{`${course.No}`}</td>
                <td>{`${course.idsubject}`}</td>
                <td>{`${course.name}`}</td>
                <td>{`${course.credit}`}</td>
                <td>{`${course.lab_lec}`}</td>
                <td>{`${course.sec}`}</td>
                <td className="CheckRegisCoruse-blue-text">{`${course.teacher}`}</td>
                <td>{`${course.n_people}`}</td>
                <td>{course.class}</td>
                <td className="CheckRegisCoruse-blue-text">{`${course.day}`}</td>
                <td>{`${course.time_start}`}-{`${course.time_end}`}</td>
                <td>{`${course.room}`}</td>
              </tr>
            </tbody>
            ))}
          </table>
        </header> 
      </div>
    );
  }
export default ListCoruse;