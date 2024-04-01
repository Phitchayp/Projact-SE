import React, { useState, useEffect } from 'react';
import './Checkbox.css';

function CheckBoxRe({ onOptionsChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event, option) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedOptions(prevOptions => [...prevOptions, option]); // เพิ่ม option เข้าไปใน selectedOptions
    } else {
      setSelectedOptions(prevOptions => prevOptions.filter(selectedOption => selectedOption !== option)); // ลบ option ออกจาก selectedOptions
    }
  };

  useEffect(() => {
    // เรียงลำดับค่าใน selectedOptions ก่อนส่งไปยังฟังก์ชัน onOptionsChange
    const sortedOptions = [...selectedOptions].sort((a, b) => a.localeCompare(b));
    onOptionsChange(sortedOptions);
  }, [selectedOptions, onOptionsChange]);
  
  return (
    <div className="App">
      <div className="boxContainer">
        <div className="buttonGroup">
          <input 
            type="checkbox" 
            id="option1" 
            checked={selectedOptions.includes("1")}
            onChange={(e) => handleCheckboxChange(e, "1")} />
          <label htmlFor="option1"><span> 1</span></label>
        </div>

        <div className="buttonGroup">
          <input 
            type="checkbox" 
            id="option2" 
            checked={selectedOptions.includes("2")}
            onChange={(e) => handleCheckboxChange(e, "2")} />
          <label htmlFor="option2"><span> 2</span></label>
        </div>

        <div className="buttonGroup">
          <input 
            type="checkbox" 
            id="option3" 
            checked={selectedOptions.includes("3")}
            onChange={(e) => handleCheckboxChange(e, "3")} />
          <label htmlFor="option3"><span> 3</span></label>
        </div>

        <div className="buttonGroup">
          <input 
            type="checkbox" 
            id="option4" 
            checked={selectedOptions.includes("4")}
            onChange={(e) => handleCheckboxChange(e, "4")} />
          <label htmlFor="option4"><span> 4 </span></label>
        </div>

        <div className="buttonGroup">
          <input 
            type="checkbox" 
            id="option5" 
            checked={selectedOptions.includes("x")}
            onChange={(e) => handleCheckboxChange(e, "x")} />
          <label htmlFor="optionX"><span> X</span></label>
        </div>
      </div>
      <div>ปี: {selectedOptions.join(', ')}</div> {/* แสดงค่าที่เลือกทั้งหมด */}
    </div>
  );
}

export default CheckBoxRe;