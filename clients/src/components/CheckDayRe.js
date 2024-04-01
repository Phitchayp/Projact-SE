import React, { useState } from 'react';

function CheckDayRe({ handleInputChangeDay }) {
    const [inputDay, setInputDay] = useState("");

    const handleChange = (event) => {
        const selectedDay = event.target.value;
        setInputDay(selectedDay);
        handleInputChangeDay(selectedDay); // เรียกใช้ฟังก์ชัน handleInputChange ที่ถูกส่งเข้ามาใน props โดยส่งค่า selectedDay ไปด้วย
    };

    return (
        <div>
            <div className="testtable-dropdownposition">
                <select className="testtable-dropdown" onChange={handleChange}> {/* เพิ่ม onChange เพื่อให้เมื่อมีการเลือก dropdown จะเรียกใช้ handleChange */}
                    <option value=""></option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </div>
        </div>
    );
}

export default CheckDayRe;