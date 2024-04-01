import React, { useState } from 'react';
import './Checkbox.css';

function People({handleInputChange}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleInputChange(event); // เรียกใช้ handleInputChange ที่ถูกส่งเข้ามาใน props
  };
  

  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={handleChange} // เรียกใช้ handleChange เพื่ออัปเดตค่า inputValue
          style={{ width: '70px' }}
        />
      </div>
    </div>
  );
}

export default People;
