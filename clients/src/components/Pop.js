import React, { useState, useEffect } from 'react';
import './Pop.css';
import { IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import { CgFileDocument } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Axios from "axios";

const Pop = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [userList,setuserList] = useState([]);

  const handleFileUpload = (file) => {
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
    Axios.get("http://127.0.0.1:3001/add").then((response) => {
        setuserList(response.data);
    });
  };

  const handleButtonClick = () => {
    Axios.post("http://127.0.0.1:3001/upload",{
      excelData:excelData,

    }).then(() => {
      setuserList([
        ...userList,
        {
          excelData:excelData,

      },
      ]);
    });

    console.log(excelData);
  };

  const handleButtonAdd = () => {
    Axios.post("http://127.0.0.1:3001/create",{
      email: email,
      fullName:fullName,
    }).then(() => {
      setuserList([
        ...userList,
        {
        email: email,
        fullName:fullName
      },
      ]);
      setEmail('');
      setFullName('');

      // ปิด popup
      onClose();
      window.location.reload()
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
    console.log("User list updated:", userList);
  }, [userList]);


  return (
    <div className="Pop-addmin" style={{ textAlign: 'left' }}>

      <div className='out-addmin'>
        <IoIosClose onClick={onClose} className='btExit' />
      </div>

      <div className='in-addmin'>

        <div className='left-addmin' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <h1 style={{ fontFamily: 'Kanit, sans-serif' ,color: '#838383', fontSize: 'small' }}>
            <span style={{ fontFamily: 'Kanit, sans-serif' , color: '#8C3941' }}>นำเข้ารายชื่อผู้ใช้อาจารย์</span> (*ครั้งละ 1 file)
          </h1>

          <div
            className="drop-area-addmin "
            onClick={() => document.querySelector('input[type=file]').click()}
          >
            <CgFileDocument style={{ fontFamily: 'Kanit, sans-serif' , fontSize: '50px', marginTop: '10px' }} />
            <p >{fileName ? fileName : 'Import file excel'}</p>

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

              <button onClick={handleButtonClick} className='btn'>
                <FaRegSave style={{ fontFamily: 'Kanit' ,fontSize: '15px', marginRight: '3px' ,paddingTop:'5px'}} />
                SAVE
              </button>
            </div>
          )}
        </div>

        <div className='right-addmin'>

          <h1 style={{ fontFamily: 'Kanit', color: '#838383', fontSize: 'small' }}>
            <span style={{ color: '#8C3941' }}>เพิ่มรายชื่อผู้ใช้งาน</span> (*ครั้งละ 1 USER)
          </h1>

          <div>
            <label style={{ fontFamily: 'Kanit' ,fontSize: '15px', display: 'block',fontweight: 'bold' , marginBottom: '5px' }}>EMAIL:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Kanit' ,fontSize: '15px', display: 'block' ,fontweight: 'bold' , marginBottom: '5px' }}>ชื่อ-สกุล:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', marginTop: 'auto' }}>
            <button onClick={handleButtonAdd} className='btn'>
              <IoIosAddCircleOutline style={{ fontFamily: 'Kanit' , fontSize: '15px', marginRight: '3px' , paddingTop:'5px' }} />
              ADD
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const iconSize = 40; // กำหนดขนาดของไอคอน

  return (
    <div>
      {/* ให้ IoIosAddCircleOutline มีการตอบสนองและเรียก togglePopup */}
      <IoIosAddCircleOutline
        onClick={togglePopup}
        style={{ fontSize: `${iconSize}px`, cursor: 'pointer' , color:'green' }}
      />

      {isOpen && (
        <div className="popup-addmin">
          <div className="popup-content-addmin">
            {/* นำเข้าและแสดง Component pop ใน Popup */}
            <Pop onClose={togglePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
