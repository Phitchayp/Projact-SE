import React, { useState } from 'react';
import './DateAdmin.css';
import { ReactComponent as IconDate } from '../assets/fluent-mdl2--date-time.svg';
import { ReactComponent as IconTime } from '../assets/time_clock.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import SaveTime from './saveTime';
import Axios from 'axios';
import Swal from 'sweetalert2';

dayjs.extend(customParseFormat);

function DateAdmin() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [dayS, setDayS] = useState("");
    const [timeS, setTimeS] = useState("");
    const [dayF, setDayF] = useState("");
    const [timeF, setTimeF] = useState("");
    const [startDateEdu, setStartDateEdu] = useState(null);
    const [endDateEdu, setEndDateEdu] = useState(null);
    const [startTimeEdu, setStartTimeEdu] = useState(null);
    const [endTimeEdu, setEndTimeEdu] = useState(null);
    const [daySEdu, setDaySEdu] = useState("");
    const [timeSEdu, setTimeSEdu] = useState("");
    const [dayFEdu, setDayFEdu] = useState("");
    const [timeFEdu, setTimeFEdu] = useState("");

    const handleButtonSaveTeacher = () => {
        if (!dayS || !dayF || !timeS || !timeF) {
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถบันทึกได้',
                text: 'โปรดเลือกวันที่และเวลาให้ครบถ้วน',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            });;
            return;
        }
        // ตรวจสอบว่าวันที่เริ่มต้นไม่น้อยกว่าวันที่สิ้นสุด
        if (dayS && dayF) {
            // เงื่อนไขที่ 1: วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น
            if (dayS > dayF) {
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่สามารถบันทึกได้',
                    text: 'วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น',
                    customClass: {
                        title: 'kanit-font',
                        content: 'kanit-font',
                        confirmButton: 'kanit-font',
                        cancelButton: 'kanit-font',
                        popup: 'kanit-font'
                      }
                });;
                return;
            }
        
            // เงื่อนไขที่ 2: ถ้าเป็นวันเดียวกัน แต่เวลาเริ่มต้นไม่น้อยกว่าเวลาสิ้นสุด
            if (dayS === dayF) {
                // ถ้าเป็นวันเดียวกันและเวลาเริ่มต้นไม่น้อยกว่าเวลาสิ้นสุด
                if (timeS >= timeF) {
                    Swal.fire({
                        icon: 'error',
                        title: 'วันเดียวกัน',
                        text: 'เวลาเริ่มต้นต้องมาก่อนเวลาสิ้นสุด และเวลาห้ามเท่ากัน',
                        customClass: {
                            title: 'kanit-font',
                            content: 'kanit-font',
                            confirmButton: 'kanit-font',
                            cancelButton: 'kanit-font',
                            popup: 'kanit-font'
                          }
                    });
                    return;
                }
            }
        }
        
        Axios.post("http://localhost:3001/timeT", {
          dayS: dayS,
          timeS: timeS,
          dayF: dayF,
          timeF: timeF,
        }).then(response => {
            console.log(response.data);
            // ทำการรีเซ็ตค่าในฟอร์มหลังจากส่งข้อมูลเรียบร้อย
            setStartDate(null);
            setEndDate(null);
            setStartTime(null);
            setEndTime(null);
            setDayS("");
            setTimeS("");
            setDayF("");
            setTimeF("");
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'บันทึกเวลาเรียบร้อยแล้ว',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            })
        }).catch(error => {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถบันทึกได้',
                text: 'ข้อมูลไม่ถูกต้อง',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            });
        });
        console.log("save");
        console.log(dayS);
        console.log(dayF);
        console.log(timeS);
        console.log(timeF);
        
        
    };

    const handleButtonSaveEdu = () => {
        if (!daySEdu || !dayFEdu || !timeSEdu || !timeFEdu) {
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถบันทึกได้',
                text: 'โปรดเลือกวันที่และเวลาให้ครบถ้วน',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            });;
            return;
        }
        // ตรวจสอบว่าวันที่เริ่มต้นไม่น้อยกว่าวันที่สิ้นสุด
        if (daySEdu && dayFEdu) {
            // เงื่อนไขที่ 1: วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น
            if (daySEdu > dayFEdu) {
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่สามารถบันทึกได้',
                    text: 'วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น',
                    customClass: {
                        title: 'kanit-font',
                        content: 'kanit-font',
                        confirmButton: 'kanit-font',
                        cancelButton: 'kanit-font',
                        popup: 'kanit-font'
                      }
                });;
                return;
            }
        
            // เงื่อนไขที่ 2: ถ้าเป็นวันเดียวกัน แต่เวลาเริ่มต้นไม่น้อยกว่าเวลาสิ้นสุด
            if (daySEdu === dayFEdu) {
                // ถ้าเป็นวันเดียวกันและเวลาเริ่มต้นไม่น้อยกว่าเวลาสิ้นสุด
                if (timeSEdu >= timeFEdu) {
                    Swal.fire({
                        icon: 'error',
                        title: 'วันเดียวกัน',
                        text: 'เวลาเริ่มต้นต้องมาก่อนเวลาสิ้นสุด และเวลาห้ามเท่ากัน',
                        customClass: {
                            title: 'kanit-font',
                            content: 'kanit-font',
                            confirmButton: 'kanit-font',
                            cancelButton: 'kanit-font',
                            popup: 'kanit-font'
                          }
                    });
                    return;
                }
            }
        }
        Axios.post("http://localhost:3001/timeEdu", {
          dayS: daySEdu,
          timeS: timeSEdu,
          dayF: dayFEdu,
          timeF: timeFEdu,
        }).then(response => {
            console.log(response.data);
            // ทำการรีเซ็ตค่าในฟอร์มหลังจากส่งข้อมูลเรียบร้อย
            setStartDateEdu(null);
            setEndDateEdu(null);
            setStartTimeEdu(null);
            setEndTimeEdu(null);
            setDaySEdu("");
            setTimeSEdu("");
            setDayFEdu("");
            setTimeFEdu("");
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'บันทึกเวลาเรียบร้อยแล้ว',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            })
        })
        .catch(error => {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถบันทึกได้',
                text: 'ข้อมูลไม่ถูกต้อง',
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            });
        });
        console.log("save");
        console.log(daySEdu);
        console.log(dayFEdu);
        console.log(timeSEdu);
        console.log(timeFEdu);
        
        
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setDayS(dayjs(date).format("YYYY-MM-DD"));
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setDayF(dayjs(date).format("YYYY-MM-DD"));
    };
    
    const handleStartTimeChange = (time) => {
        if (time) {
            setStartTime(time);
            setTimeS(dayjs(time).format("HH:mm:ss"));
        } else {
            // ถ้าค่าที่เลือกว่างเปล่า กำหนดค่าว่างให้กับตัวแปร
            setStartTime(null);
            setTimeS("");
        }
    };
    
    const handleEndTimeChange = (time) => {
        if (time) {
            setEndTime(time);
            setTimeF(dayjs(time).format("HH:mm:ss"));
        } else {
            // ถ้าค่าที่เลือกว่างเปล่า กำหนดค่าว่างให้กับตัวแปร
            setEndTime(null);
            setTimeF("");
        }
    };

    const handleStartDateChangeEdu = (date) => {
        setStartDateEdu(date);
        setDaySEdu(dayjs(date).format("YYYY-MM-DD"));
    };
    
    const handleEndDateChangeEdu = (date) => {
        setEndDateEdu(date);
        setDayFEdu(dayjs(date).format("YYYY-MM-DD"));
    };
    
    const handleStartTimeChangeEdu = (time) => {
        if (time) {
            setStartTimeEdu(time);
            setTimeSEdu(dayjs(time).format("HH:mm:ss"));
        } else {
            // ถ้าค่าที่เลือกว่างเปล่า กำหนดค่าว่างให้กับตัวแปร
            setStartTimeEdu(null);
            setTimeSEdu("");
        }
    };
    
    const handleEndTimeChangeEdu = (time) => {
        if (time) {
            setEndTimeEdu(time);
            setTimeFEdu(dayjs(time).format("HH:mm:ss"));
        } else {
            // ถ้าค่าที่เลือกว่างเปล่า กำหนดค่าว่างให้กับตัวแปร
            setEndTimeEdu(null);
            setTimeFEdu("");
        }
    };
    return (
        <div className='turnleft-all'>
            <h className='DateAdmin-text' >ตั้งเวลาการใช้งานระบบ</h>
            <div className='custom-date-picker-all2'>
                <div className='Down-picker'>
                    <h className='text-header' >ระบบลงทะเบียน</h>
                    
                    <div >
                        <p className='DateAdmin-text'>อาจารย์</p>
                        <p className='DateAdmin-text2'>เวลาใช้งานการลงทะเบียน</p>
                    </div>
                    <div className='column-date'>
                        <div>
                            <div className='custom-date-picker-all'>
                                <div>
                                    <p className='DateAdmin-text3'>เริ่มต้น</p>
                                </div>
                                <div className="custom-date-picker-container">
                                    <IconDate className="icon-date" />
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                        placeholderText="เลือกวันที่เริ่มต้น"
                                        className="custom-date-picker"
                                    />
                                </div>
                                <div className='Down-picker'>
                                    <p className='DateAdmin-text3'>สิ้นสุด</p>
                                </div>
                                <div className="custom-date-picker-container">
                                    <IconDate className="icon-date" />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                        placeholderText="เลือกวันที่สิ้นสุด"
                                        className="custom-date-picker"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='custom-date-picker-all2' >
                            <p className='DateAdmin-text3'>เริ่มต้น</p>
                            <div >
                                <div className="custom-date-picker-container" >
                                    <IconTime className="icon-date" />
                                    <TimePicker
                                        selected={startTime}
                                        onChange={handleStartTimeChange}
                                        value={startTime}
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        use12Hours={false}
                                        // suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
                                    />
                                </div>
                                <div className='Down-picker'>
                                    <p className='DateAdmin-text3'>สิ้นสุด</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconTime className="icon-date" />
                                    <TimePicker
                                        selected={endTime}
                                        onChange={handleEndTimeChange}
                                        value={endTime}
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        use12Hours={false}
                                        // suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:'10px',marginLeft:'25em',borderRadius:'20px'}}>
                    <SaveTime onClick={handleButtonSaveTeacher} />
                </div>
                
                <div className='line'></div>

                <div className='Down-picker'>
                    <h className='text-header' >ระบบนำเข้ารายวิชา</h>
                    
                    <div >
                        <p className='DateAdmin-text'>ฝ่ายการศึกษา</p>
                        <p className='DateAdmin-text2'>เวลาใช้งานการนำเข้ารายวิชาและเวลาเปิดสอนรายวิชา</p>
                    </div>
                    <div className='column-date'>
                        <div>
                            <div className='custom-date-picker-all'>
                                <div>
                                    <p className='DateAdmin-text3'>เริ่มต้น</p>
                                </div>
                                <div className="custom-date-picker-container">
                                    <IconDate className="icon-date" />
                                    <DatePicker
                                        selected={startDateEdu}
                                        onChange={handleStartDateChangeEdu}
                                        dateFormat="yyyy-MM-dd"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                        placeholderText="เลือกวันที่เริ่มต้น"
                                        className="custom-date-picker"
                                    />
                                </div>
                                <div className='Down-picker'>
                                    <p className='DateAdmin-text3'>สิ้นสุด</p>
                                </div>
                                <div className="custom-date-picker-container">
                                    <IconDate className="icon-date" />
                                    <DatePicker
                                        selected={endDateEdu}
                                        onChange={handleEndDateChangeEdu}
                                        dateFormat="yyyy-MM-dd"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                        placeholderText="เลือกวันที่สิ้นสุด"
                                        className="custom-date-picker"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='custom-date-picker-all2' >
                            <p className='DateAdmin-text3'>เริ่มต้น</p>
                            <div >
                                <div className="custom-date-picker-container" >
                                    <IconTime className="icon-date" />
                                    <TimePicker
                                        selected={startTimeEdu}
                                        onChange={handleStartTimeChangeEdu}
                                        value={startTimeEdu}
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        use12Hours={false}
                                        // suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
                                        clearIcon={null}
                                    />
                                </div>
                                <div className='Down-picker'>
                                    <p className='DateAdmin-text3'>สิ้นสุด</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconTime className="icon-date" />
                                    <TimePicker
                                        selected={endTimeEdu}
                                        onChange={handleEndTimeChangeEdu}
                                        value={endTimeEdu}
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        use12Hours={false}
                                        // suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
                                        clearIcon={null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:'10px',marginLeft:'25em'}}>
                    <SaveTime onClick={handleButtonSaveEdu} />
                </div>
            </div>
            
        </div>
    );
}

export default DateAdmin;
