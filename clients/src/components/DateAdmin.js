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
        // ตรวจสอบว่าวันที่เริ่มต้นไม่น้อยกว่าวันที่สิ้นสุด
        if (dayS && dayF && dayS > dayF) {
            if (timeS === timeF) {
                // ถ้าเวลาเริ่มต้นเท่ากับเวลาสิ้นสุด
                alert("เวลาเริ่มต้นและเวลาสิ้นสุดต้องไม่เท่ากัน");
                return;
            }
            alert("วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น");
            return;
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
            alert("บันทึกเวลาเรียบร้อยแล้ว");
            window.location.reload();

        })
        .catch(error => {
            console.error(error);

            alert("ข้อมูลไม่ถูกต้อง");
        });
        console.log("save");
        console.log(dayS);
        console.log(dayF);
        console.log(timeS);
        console.log(timeF);
        
        
    };

    const handleButtonSaveEdu = () => {
        // ตรวจสอบว่าวันที่เริ่มต้นไม่น้อยกว่าวันที่สิ้นสุด
        if (daySEdu && dayFEdu && daySEdu > dayFEdu) {
            alert("วันที่สิ้นสุดห้ามมาก่อนวันที่เริ่มต้น");
            return;
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
            alert("บันทึกเวลาเรียบร้อยแล้ว");
            window.location.reload();
        })
        .catch(error => {
            console.error(error);

            alert("ข้อมูลไม่ถูกต้อง");
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
        setStartTime(time);
        setTimeS(dayjs(time).format("HH:mm:ss"));
    };
    
    const handleEndTimeChange = (time) => {
        setEndTime(time);
        setTimeF(dayjs(time).format("HH:mm:ss"));
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
        setStartTimeEdu(time);
        setTimeSEdu(dayjs(time).format("HH:mm:ss"));
    };
    
    const handleEndTimeChangeEdu = (time) => {
        setEndTimeEdu(time);
        setTimeFEdu(dayjs(time).format("HH:mm:ss"));
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
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        suffixIcon={<i className="fas fa-wifi" />}
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
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        suffixIcon={<i className="fas fa-wifi" />}
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
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
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
                                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                        showNow={false}
                                        format="HH:mm:ss"
                                        suffixIcon={<i className="fas fa-wifi" />}
                                        className="custom-time-picker"
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
