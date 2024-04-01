import React, { useState } from 'react';
import './Checkbox.css';

function CheckBoxRe({ onOptionsChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  // Call the onOptionsChange function with updated optionsText
  React.useEffect(() => {
    const optionsText = selectedOptions.join(', ');
    onOptionsChange(optionsText);
  }, [selectedOptions, onOptionsChange]);

  return (
    <div className="App">
      <div className="boxContainer">
        <div className="buttonGroup" >
          <input type="checkbox" id="option1" name="check" value="1" onChange={handleCheckboxChange} />
          <label htmlFor="option1"><span> 1</span></label>
        </div>

        <div className="buttonGroup">
          <input type="checkbox" id="option2" name="check" value="2" onChange={handleCheckboxChange} />
          <label htmlFor="option2"><span> 2</span></label>
        </div>

        <div className="buttonGroup">
          <input type="checkbox" id="option3" name="check" value="3" onChange={handleCheckboxChange} />
          <label htmlFor="option3"><span> 3</span></label>
        </div>

        <div className="buttonGroup">
          <input type="checkbox" id="option4" name="check" value="4" onChange={handleCheckboxChange} />
          <label htmlFor="option4"><span> 4 </span></label>
        </div>

        <div className="buttonGroup">
          <input type="checkbox" id="optionX" name="check" value="X" onChange={handleCheckboxChange} />
          <label htmlFor="optionX"><span> X</span></label>
        </div>
      </div>
      
    </div>
  );
}

export default CheckBoxRe;
