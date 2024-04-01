import React, { useState } from 'react';
import './Checkbox.css';

function People({ handleInputChange }) {
  const [inputValue, setInputValue] = useState(""); // กำหนดค่าเริ่มต้นเป็น 0

  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && Number(value) >= 0) { // ตรวจสอบว่าค่าที่ป้อนเข้ามาเป็นตัวเลขและมากกว่าหรือเท่ากับ 0 หรือไม่
      setInputValue(Number(value));
      handleInputChange(event); // เรียกใช้ handleInputChange ที่ถูกส่งเข้ามาใน props
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange} // เรียกใช้ handleChange เพื่ออัปเดตค่า inputValue
          style={{ width: '70px' }}
        />
      </div>
    </div>
  );
}

export default People;