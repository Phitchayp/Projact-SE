import React, { useState, useEffect } from 'react';
import './InputEdu.css';
import { IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import { CgFileDocument } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Axios from "axios";


const InputEdu = ({ selectcourse1,selectedValue2, selectedValue3, selectedValue4, reloadPage }) => {
    const [idSubject, setIdSubject] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectList, setsubjectList] = useState([]);


    const handleButtonAdd = () => {
        if (!selectedValue2 || !idSubject || !subjectName || !selectedValue3 || !selectedValue4 || !selectcourse1) {
            window.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return; // ไม่ทำงานต่อไปหากข้อมูลในตัวแปรใดตัวหนึ่งว่าง
        }
        if (!/^\d{8}$/.test(idSubject)) {
            window.alert('กรุณากรอกรหัสวิชาเป็นตัวเลขให้ครบ 8 ตัว');
            return; // ไม่ทำงานต่อไปหากค่า idSubject ไม่เป็นจำนวนเต็มหรือเกิน 8 ตัว
        }
        if (!/^[\wก-๙- ]+$/.test(subjectName)) {
            window.alert('กรุณากรอกชื่อวิชาให้ถูกต้อง');
            return; // ไม่ทำงานต่อไปหาก subjectName ไม่ถูกต้อง
        }
        
    
        Axios.post("http://127.0.0.1:3001/addsub", {
            selectcourse1: selectcourse1,
            selectedValue2: selectedValue2,
            idSubject: idSubject,
            subjectName: subjectName,
            selectedValue4: selectedValue4,
            selectedValue3: selectedValue3,
        }).then(response => {
            if (response.data === "Data already exists, not inserted") {
                window.alert('พบข้อมูลรายวิชานี้ในระบบอยู่แล้ว');
            } else {
                window.alert('เพิ่มข้อมูลรายวิชาสำเร็จ');
                setsubjectList([
                    ...subjectList,
                    {
                        selectcourse1: selectcourse1,
                        selectedValue2: selectedValue2,
                        idSubject: idSubject,
                        subjectName: subjectName,
                        selectedValue4: selectedValue4,
                        selectedValue3: selectedValue3,
                    },
                ]);
                setIdSubject('');
                setSubjectName('');
                reloadPage();
            }
        }).catch(error => {
            console.error('Error adding subject:', error);
            window.alert('เกิดข้อผิดพลาดในการเพิ่มวิชา');
        });
    };
    

    useEffect(() => {
        // ทำสั่งการที่คุณต้องการที่นี่ เช่น อัพเดต UI
        console.log("User list updated:", subjectList);
    }, [subjectList]);


    return (
        <div className="Pop ">

            <div className='in '>

                <div className='box-Input-position'>

                    <div>
                        <label style={{ fontFamily: 'Kanit', fontSize: '15px', display: 'block', fontweight: 'bold', marginBottom: '5px' }}>รหัสวิชา:</label>
                        <input
                            type="text"
                            value={idSubject}
                            onChange={(e) => setIdSubject(e.target.value)}
                            style={{
                                marginBottom: '10px',
                                width: '300px',
                                fontFamily: 'Kanit',
                                height: '25px',
                                borderRadius: '5px',
                                border: '1px solid black',
                            }}
                        />

                    </div>
                    <div>
                        <label style={{ fontFamily: 'Kanit', fontSize: '15px', display: 'block', fontweight: 'bold', marginBottom: '5px' }}>ชื่อวิชา:</label>
                        <input
                            type="text"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            style={{
                                marginBottom: '10px',
                                width: '300px',
                                fontFamily: 'Kanit',
                                height: '25px',
                                borderRadius: '5px',
                                border: '1px solid black',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: 'auto' , marginRight: '30px'}}>
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

export default InputEdu;