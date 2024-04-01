import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const TestTableDropdown = ({ onDropdownChange }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/room');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleDropdownChange = (event) => {
    const selectedRoom = event.target.value;
    // ส่งค่าที่ผู้ใช้เลือกไปยังฟังก์ชันที่รับข้อมูลที่เลือก
    onDropdownChange(selectedRoom);
  };

  return (
    <div className="testtable-dropdownposition">
      <select className="testtable-dropdown" onChange={handleDropdownChange}>
        <option value=""> </option>
        {rooms.map((room, index) => (
          <option key={index} value={room.room}>
            {room.room}({room.quantity})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TestTableDropdown;
