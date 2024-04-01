import React, { useState, useEffect } from 'react';
import './UploadRoom.css';
import { IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import { CgFileDocument } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Axios from "axios";
import Swal from 'sweetalert2';

const UploadRoom = ({ selectedValue8, selectedValue9 }) => {
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [roomList, setroomList] = useState([]);

  const handleFileUpload = (file) => {
    // ตรวจสอบว่ามีการเลือกไฟล์หรือไม่
    if (!file) {
      return; // ออกจากฟังก์ชันทันที
    }
    // ตรวจสอบนามสกุลของไฟล์
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop();
    // เช็คว่านามสกุลของไฟล์ไม่อยู่ในรายการนามสกุลที่อนุญาต
    if (!allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        icon: 'error',
        title: 'รูปแบบไฟล์ไม่ถูกต้อง',
        text: 'โปรดเลือกไฟล์นามสกุล .xlsx เท่านั้น',
      });
      return;
    }
    // ดำเนินการต่อเมื่อไฟล์อยู่ในรูปแบบที่ถูกต้อง
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // แปลงไฟล์
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };



  const getuser = () => {
    // Axios.get("http://127.0.0.1:3001/add").then((response) => {
    //     setroomList(response.data);
    // });
  };

  const handleButtonClick = () => {
    // เช็คว่ามีข้อมูล excel และไฟล์มีนามสกุล .xlsx หรือไม่
    if (!excelData || !fileName.endsWith('.xlsx')) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกไม่สำเร็จ',
        text: 'โปรดเลือกไฟล์นามสกุล .xlsx เท่านั้น',
        customClass: {
          popup: 'kanit-font',
          header: 'kanit-font',
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          footer: 'kanit-font'
        }
      });
      return; // ไม่ดำเนินการต่อไปหากไม่มีข้อมูล excel หรือไฟล์ไม่ใช่ .xlsx
    }

    // เช็คว่าข้อมูลใน excel มีจำนวนคอลัมน์ถูกต้องหรือไม่ (ต้องมี 3 คอลัมน์)
    const expectedColumnCount = 3; // จำนวนคอลัมน์ที่คาดหวัง
    const actualColumnCount = excelData.length > 0 ? excelData[0].length : 0; // จำนวนคอลัมน์ในข้อมูล excel
    if (actualColumnCount !== expectedColumnCount) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกไม่สำเร็จ',
        text: `รูปแบบข้อมูลใน Excel ไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่`,
        customClass: {
          popup: 'kanit-font',
          header: 'kanit-font',
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          footer: 'kanit-font'
        }
      });
      return; // ไม่ดำเนินการต่อไปหากจำนวนคอลัมน์ไม่ถูกต้อง
    }

    Axios.post("http://127.0.0.1:3001/addroom", {
      excelData: excelData,
    }).then(() => {
      setroomList([
        ...roomList,
        {
          excelData: excelData,
        },
      ]);
      Swal.fire({
        icon: 'success',
        title: 'Upload ไฟล์ห้องเรียนสำเร็จ',
      }).then(() => {
        window.location.reload();
      }); // รีโหลดหน้าหลังจากบันทึกเสร็จสิ้น
    }).catch(error => {
      console.error('Error saving data:', error);
      Swal.fire({
        icon: 'error',
        title: 'บันทึกไม่สำเร็จ',
        text: 'ข้อมูลไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่',
        customClass: {
          popup: 'kanit-font',
          header: 'kanit-font',
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          footer: 'kanit-font'
        }
      }).then(() => {
        window.location.reload();
      }); // รีโหลดหน้าหลังจากบันทึกเสร็จสิ้น// รีโหลดหน้าหลังจากบันทึกไม่สำเร็จ
    });
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  useEffect(() => {
    // ทำสั่งการที่คุณต้องการที่นี่ เช่น อัพเดต UI
    console.log("User list updated:", roomList);
  }, [roomList]);


  return (
    <div className="Pop " style={{fontFamily:'kanit'}}>

      <div className='in-Room'>

        <div className='box-Room-position ' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>

          <div
            className="drop-area-Edu size-area"
            onClick={() => document.querySelector('input[type=file]').click()}
          >
            <CgFileDocument style={{ fontSize: '80px', marginTop: '15px' }} />
            <div style={{ fontSize: '20px' }}>
              {fileName ? fileName : 'Import file excel'}
            </div>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className='file'
            />
          </div>

          {excelData && (
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 'auto' }}>
              {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}

              <button onClick={handleButtonClick} className='btn-Edu'>
                <FaRegSave style={{ fontFamily: 'Kanit', fontSize: '15px', marginRight: '3px', paddingTop: '5px' }} />
                SAVE
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UploadRoom;