import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Roomsearch = () => {
  const [rooms, setRooms] = useState([]); // สร้าง state เพื่อเก็บข้อมูลห้อง

  useEffect(() => {
    // ส่งคำขอ HTTP เพื่อดึงข้อมูลจาก API endpoint เมื่อ component โหลด
    const fetchRooms = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/room'); // เปลี่ยน URL ตาม API endpoint ของคุณ
        setRooms(response.data); // เซ็ตข้อมูลห้องที่ได้รับเข้า state
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms(); // เรียกใช้ฟังก์ชันเมื่อ component โหลด
  }, []);

  const handleDropdownChangeRoom = (event) => {
    const selectedRoom = event.target.value;
    // เรียกใช้ฟังก์ชันที่ถูกส่งผ่าน prop เพื่อส่งค่าที่เลือกใน dropdown ไปยังคอมโพเนนต์หรือไฟล์อื่น ๆ
    // DropdownChange(selectedRoom);
  };

  return (
    <div className="testtable-dropdownposition">
      <select className="testtable-dropdown" onChange={handleDropdownChangeRoom}>
        {/* เพิ่มตัวเลือกแรกที่มีค่าว่าง */}
        <option value=""> </option>
        {/* แสดงตัวเลือกห้องที่ได้จาก state */}
        {rooms.map((room, index) => (
          <option key={index} value={room.room}>
            {room.room}
          </option>
        ))}
      </select>
    </div>
  );
  
};

export default Roomsearch;
