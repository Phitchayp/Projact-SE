import React, { useState } from "react";
import "./ResultRegisEdu.css"; 
import Axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
    // เพิ่มโค้ดที่ต้องการให้ทำงานหลังจากการโหลดหน้าเว็บเสร็จสมบูรณ์ที่นี่
    var searchButton = document.getElementById("searchButton");
    var saveButton = document.getElementById("saveButton");

    if (searchButton) {
      searchButton.addEventListener("click", function () {
        var searchText = document.getElementById("searchInput").value.trim();
        console.log("คำค้นหา:", searchText);
        // ทำสิ่งที่ต้องการกับ searchText ที่ได้รับจากผู้ใช้
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", function () {
        console.log("คุณกำลังคลิกปุ่มบันทึก");
        // สามารถเพิ่มโค้ดอื่น ๆ ต่อจากนี้เพื่อทำงานตามที่ต้องการ
      });
    }
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchNameEdu = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/search-nameEdu?query=${searchText}`
      );
      if (response.data.length === 0) {
        // แสดงข้อความเมื่อไม่พบข้อมูล
        alert("ไม่พบข้อมูลชื่อผู้ใช้นี้");
      }
      setSearchResults(response.data); // อัปเดต state ด้วยข้อมูลผลการค้นหา
    } catch (error) {
      console.error("Error searching nameEdu:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      // แก้ไขตรงนี้เพื่อค้นหาทันทีที่ผู้ใช้พิมพ์
      searchNameEdu();
    } else {
      setSearchResults([]); // หากช่องค้นหาว่าง, ล้างผลลัพธ์การค้นหา
    }
  };

  const [selectedName, setSelectedName] = useState({
    name: "",
  });
  const handleSelectName = (users) => {
    setSearchText(`${usersaj.name}`);
    setSelectedName({
      name: usersaj.name,
    });
    setSearchResults([]); // ล้างผลลัพธ์การค้นหาหลังจากเลือก
  };