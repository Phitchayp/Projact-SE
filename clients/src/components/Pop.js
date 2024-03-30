import React, { useState, useEffect } from 'react';
import './Pop.css';
import { IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import { CgFileDocument } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Axios from "axios";
import Swal from 'sweetalert2';

const Pop = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [userList, setuserList] = useState([]);

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
    Axios.get("http://127.0.0.1:3001/add").then((response) => {
      setuserList(response.data);
    });
  };

  // const handleButtonClick = () => {
  //   // เช็คว่ามีข้อมูล excel และไฟล์มีนามสกุล .xlsx หรือไม่
  //   if (!excelData || !fileName.endsWith('.xlsx')) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'บันทึกไม่สำเร็จ',
  //       text: 'โปรดเลือกไฟล์นามสกุล .xlsx เท่านั้น',
  //     });
  //     return; // ไม่ดำเนินการต่อไปหากไม่มีข้อมูล excel หรือไฟล์ไม่ใช่ .xlsx
  //   }
  
  //   // เช็คว่าข้อมูลใน excel มีจำนวนคอลัมน์ถูกต้องหรือไม่ (ต้องมี 4 คอลัมน์)
  //   const expectedColumnCount = 2; // จำนวนคอลัมน์ที่คาดหวัง
  //   const actualColumnCount = excelData.length > 0 ? excelData[0].length : 0; // จำนวนคอลัมน์ในข้อมูล excel
  //   if (actualColumnCount !== expectedColumnCount) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'บันทึกไม่สำเร็จ',
  //       text: `รูปแบบข้อมูลใน Excel ไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่`,
  //     });
  //     return; // ไม่ดำเนินการต่อไปหากจำนวนคอลัมน์ไม่ถูกต้อง
  //   }
  
  //   // เช็คคอลัมน์แรกของข้อมูลใน excel ว่ามีรูปแบบอีเมลที่ถูกต้องหรือไม่
  //   const isValidEmailColumn = excelData.every(row => {
  //     const email = row[0]; // ตรวจสอบคอลัมน์แรกของแถว
  //     return /^[^\s@]+@ku\.th$/.test(email); // ตรวจสอบรูปแบบอีเมล
  //   });
  
  //   if (!isValidEmailColumn) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'บันทึกไม่สำเร็จ',
  //       text: 'ใช้ @ku.th เท่านั้น กรุณาเลือกไฟล์ใหม่',
  //     });
  //     return; // ไม่ดำเนินการต่อไปหากคอลัมน์แรกของ Excel ไม่ถูกต้อง
  //   }
  
  //   // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึก
  //   Axios.post("http://127.0.0.1:3001/uploads", {
  //     excelData: excelData,
  //   }).then(() => {
  //     setuserList([
  //       ...userList,
  //       {
  //         excelData: excelData,
  //       },
  //     ]);
  //     onClose();
  //     Swal.fire({
  //       text: 'เพิ่มข้อมูลผู้ใช้เข้าสู่ระบบสำเร็จ',
  //       customClass: {
  //         popup: 'swal-font',
  //         title: 'swal-font',
  //         text: 'swal-font',
  //       }
  //     }).then(() => {
  //       window.location.reload();
  //     });
  //   }).catch(error => {
  //     if (error.response.status === 500) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'มีอีเมลล์อยู่ในระบบแล้ว กรุณาเลือกไฟล์ใหม่',
  //         customClass: {
  //           popup: 'swal-font',
  //           title: 'swal-font',
  //           text: 'swal-font',
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'ข้อมูลไม่ถูกต้อง',
  //         text: 'กรุณาเลือกไฟล์ใหม่',
  //         customClass: {
  //           popup: 'swal-font',
  //           title: 'swal-font',
  //           text: 'swal-font',
  //         }
  //       });
  //     }
  //   }); 
  // };
  const handleButtonClick = () => {
    // เช็คว่ามีข้อมูล excel และไฟล์มีนามสกุล .xlsx หรือไม่
    if (!excelData || !fileName.endsWith('.xlsx')) {
        Swal.fire({
            icon: 'error',
            title: 'บันทึกไม่สำเร็จ',
            text: 'โปรดเลือกไฟล์นามสกุล .xlsx เท่านั้น',
        });
        return; // ไม่ดำเนินการต่อไปหากไม่มีข้อมูล excel หรือไฟล์ไม่ใช่ .xlsx
    }

    // เช็คว่าข้อมูลใน excel มีจำนวนคอลัมน์ถูกต้องหรือไม่ (ต้องมี 4 คอลัมน์)
    const expectedColumnCount = 2; // จำนวนคอลัมน์ที่คาดหวัง
    const actualColumnCount = excelData.length > 0 ? excelData[0].length : 0; // จำนวนคอลัมน์ในข้อมูล excel
    if (actualColumnCount !== expectedColumnCount) {
        Swal.fire({
            icon: 'error',
            title: 'บันทึกไม่สำเร็จ',
            text: `รูปแบบข้อมูลใน Excel ไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่`,
        });
        return; // ไม่ดำเนินการต่อไปหากจำนวนคอลัมน์ไม่ถูกต้อง
    }

    // เช็คคอลัมน์แรกของข้อมูลใน excel ว่ามีรูปแบบอีเมลที่ถูกต้องหรือไม่
    const isValidEmailColumn = excelData.every(row => {
        const email = row[0]; // ตรวจสอบคอลัมน์แรกของแถว
        return /^[^\s@]+@ku\.th$/.test(email); // ตรวจสอบรูปแบบอีเมล
    });

    if (!isValidEmailColumn) {
        Swal.fire({
            icon: "warning",
            title: "พบ email ที่ไม่สามารถบันทึกได้",
            text: " คุณยังต้องการบันทึกข้อมูลหรือไม่",
            showDenyButton: true,
            confirmButtonText: "Save",
            denyButtonText: `cancle`,
            footer: "หากยืนยัน email ที่เกิดปัญหาจะไม่ได้รับการบันทึกลงระบบ"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // ทำการบันทึกเฉพาะข้อมูลที่มีอีเมลที่ไม่ซ้ำกับฐานข้อมูลและมีรูปแบบอีเมลถูกต้อง
                const filteredExcelData = excelData.filter(row => {
                    const email = row[0];
                    return /^[^\s@]+@ku\.th$/.test(email); // ตรวจสอบรูปแบบอีเมล
                });
                // ตรวจสอบว่าข้อมูลในคอลัมน์ที่สองของ excelData มีแถวที่ไม่มีข้อมูลหรือไม่
                const hasEmptyDataInColumn2 = filteredExcelData.some(row => !row[1]);
                if (hasEmptyDataInColumn2) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'ข้อมูลไม่ถูกต้อง',
                        text: 'กรุณาเลือกไฟล์ใหม่',
                    });
                    return;
                }
                saveData(filteredExcelData);
            } else if (result.isDenied) {
                Swal.fire("ยกเลิกการบันทึกสำเร็จ", "", "info");
                return;
            }
        });
    } else {
        // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึกโดยไม่ต้องการการยืนยันเพิ่มเติม
        saveData(excelData);
    }
};

const saveData = (data) => {
    Axios.post("http://127.0.0.1:3001/upload", {
        excelData: data,
    }).then(() => {
        setuserList([
            ...userList,
            {
                excelData: data,
            },
        ]);
        onClose();
        Swal.fire({
            text: 'เพิ่มข้อมูลผู้ใช้เข้าสู่ระบบสำเร็จ',
            customClass: {
                popup: 'swal-font',
                title: 'swal-font',
                text: 'swal-font',
            }
        }).then(() => {
            window.location.reload();
        });
    }).catch(error => {
        if (error.response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'มีอีเมลล์อยู่ในระบบแล้ว กรุณาเลือกไฟล์ใหม่',
                customClass: {
                    popup: 'swal-font',
                    title: 'swal-font',
                    text: 'swal-font',
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'บันทึกไม่สำเร็จ',
                text: 'ใช้ @ku.th เท่านั้น กรุณาเลือกไฟล์ใหม่',
                customClass: {
                    popup: 'swal-font',
                    title: 'swal-font',
                    text: 'swal-font',
                }
            });
        }
    });
};

  const handleButtonAdd = () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        text: 'กรุณาป้อนอีเมลที่ถูกต้อง (ใช้ @ku.th เท่านั้น)',
        customClass: {
          popup: 'swal-font',
          title: 'swal-font',
          text: 'swal-font',
        }
      });
      return; // หยุดการทำงานถ้าอีเมลไม่ถูกต้อง
    }
    if (!email || !fullName) {
      Swal.fire({
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        customClass: {
          popup: 'swal-font',
          title: 'swal-font',
          text: 'swal-font',
        }
      });

      return;
    }

    Axios.post("http://127.0.0.1:3001/create", {
      email: email,
      fullName: fullName,
    })
      .then(response => {
        // หากบันทึกข้อมูลสำเร็จ
        setuserList([
          ...userList,
          {
            email: email,
            fullName: fullName
          },
        ]);
        setEmail('');
        setFullName('');
        Swal.fire({
          icon: 'success', // กำหนด icon ของ Swal เป็น success
          title: 'สำเร็จ',
          text: `เพิ่มข้อมูลผู้ใช้ ${email} เข้าสู่ระบบสำเร็จ`, // กำหนดข้อความตามที่ต้องการแสดง
          showConfirmButton: true, // ซ่อนปุ่มยืนยัน
          customClass: {
            popup: 'swal-font',
            title: 'swal-font',
            text: 'swal-font',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // รีโหลดหน้าเว็บหลังจากคลิกปุ่ม "ตกลง"
          }
        });
      }).catch(error => {
        // หากเกิดข้อผิดพลาดในการบันทึก
        if (error.response.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'อีเมลล์นี้มีในระบบอยู่แล้ว',
            customClass: {
              popup: 'swal-font',
              title: 'swal-font',
              text: 'swal-font',
            }
          });
        } else {
          console.error('เกิดข้อผิดพลาดในการส่งคำขอ:', error);


        }
      });
  };



  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const isValidEmail = (email) => {
    // Regex สำหรับตรวจสอบรูปแบบของอีเมล
    const emailRegex = /^[^\s@]+@ku.th/;
    return emailRegex.test(email);
  };



  return (
    <div className="Pop-addmin" style={{ textAlign: 'left' }}>

      <div className='out-addmin'>
        <IoIosClose onClick={onClose} className='btExit' />
      </div>

      <div className='in-addmin'>

        <div className='left-addmin' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <h1 style={{ fontFamily: 'Kanit, sans-serif', color: '#838383', fontSize: 'small' }}>
            <span style={{ fontFamily: 'Kanit, sans-serif', color: '#8C3941' }}>นำเข้ารายชื่อผู้ใช้อาจารย์</span> (*ครั้งละ 1 file)
          </h1>

          <div
            className="drop-area-addmin "
            onClick={() => document.querySelector('input[type=file]').click()}
          >
            <CgFileDocument style={{ fontFamily: 'Kanit, sans-serif', fontSize: '50px', marginTop: '10px' }} />
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
                <FaRegSave style={{ fontFamily: 'Kanit', fontSize: '15px', marginRight: '3px', paddingTop: '5px' }} />
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
            <label style={{ fontFamily: 'Kanit', fontSize: '15px', display: 'block', fontweight: 'bold', marginBottom: '5px' }}>EMAIL:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Kanit', fontSize: '15px', display: 'block', fontweight: 'bold', marginBottom: '5px' }}>ชื่อ-สกุล:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', marginTop: 'auto' }}>
            <button onClick={handleButtonAdd} className='btn'>
              <IoIosAddCircleOutline style={{ fontFamily: 'Kanit', fontSize: '15px', marginRight: '3px', paddingTop: '5px' }} />
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

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'Kanit, sans-serif', marginRight: '800px' }}>อาจารย์</h1>
      {/* ให้ IoIosAddCircleOutline มีการตอบสนองและเรียก togglePopup */}
      <IoIosAddCircleOutline
        onClick={togglePopup}
        style={{ fontSize: `${iconSize}px`, cursor: 'pointer', color: 'green' }}
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
