import React, { useState, useEffect } from 'react';
import './UploadEdu.css';
import { IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import { CgFileDocument } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Axios from "axios";
import InputEdu from '../Input/InputEdu';

const UploadEdu = ({selectcourse,selectedValue1}) => {
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [subjectList,setsubjectList] = useState([]);

  

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
    Axios.get("http://localhost:3001/add").then((response) => {
        setsubjectList(response.data);
        
    });
  };



  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:3001/getsub');
  //         setBoxes(response.data);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // };
  const handleButtonClick = () => {
    if (!selectedValue1 || !selectcourse) {
      window.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return; // ไม่ทำงานต่อไปหาก selectedValue1 ว่าง
    }
    Axios.post("http://localhost:3001/uploaded", {
        excelData: excelData,
        selectedValue1: selectedValue1,
        selectcourse:selectcourse
    }).then(() => {
        window.alert('บันทึกข้อมูลรายวิชาสำเร็จ');
        window.location.reload();
        
        setsubjectList([
            ...subjectList,
            {
                excelData: excelData,
                
                // selectedValue1: selectedValue1,
            },
        ]);
        
    }).catch(error => {
        console.error('Error saving data:', error);
        window.alert('ข้อมูลไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่');
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
    console.log("User list updated:", subjectList);
  }, [subjectList]);


  return (
    <div className="Pop ">

      <div className='in-Edu '>

        <div className='box-Edu-position' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>

          <div
            className="drop-area-Edu "
            onClick={() => document.querySelector('input[type=file]').click()}
          >
            <CgFileDocument style={{ fontSize: '80px', marginTop: '15px' }} />
            <div style={{fontSize: '20px'}}>
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
                <FaRegSave style={{ fontFamily: 'Kanit' ,fontSize: '15px', marginRight: '3px' ,paddingTop:'5px'}} />
                SAVE
              </button>
              
            </div>
          )}

        </div>
        {/* <div>
          <InputEdu/>
        </div> */}
      </div>
    </div>
  );
};

export default UploadEdu;