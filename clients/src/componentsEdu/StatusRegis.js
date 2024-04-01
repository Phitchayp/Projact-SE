import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './StatusRegis.css';

function StatusRegis() {
    const [condition, setCondition] = useState(false);

    const handleCheckCondition = () => {
        // อัปเดตสถานะเมื่อกดปุ่ม
        setCondition(prevCondition => !prevCondition);

        // แสดง SweetAlert2 ด้วย icon success หรือ warning
        if (condition) {
            Swal.fire({
                icon: 'error',
                title: 'เงื่อนไขเป็นเท็จ',
                text: 'กรุณาตรวจสอบสถานะอีกครั้ง',
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
        } else {
            Swal.fire({
                icon: 'success',
                title: 'เงื่อนไขเป็นจริง',
                text: 'การตรวจสอบสถานะเสร็จสิ้น',
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
        }
    };

    return (
        <div style={{width:'90px'}}>
            <div>
                <p style={{fontWeight:'bold' , color:'#8C3941' , marginBottom:'-10px'}}>สถานะการลงทะเบียน</p> 
                <p style={{fontWeight:'bold' , color:'red' }}>**กรุณากดปุ่ม**</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={`circle ${condition ? 'green' : 'red'}`}>
                    {condition ? 'จริง' : 'เท็จ'}
                </div>


                <button className="button-checkregis" onClick={handleCheckCondition}>Check</button>
            </div>


        </div >
    );
}

export default StatusRegis;