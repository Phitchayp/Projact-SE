import React, { useState } from 'react';
import './Timepicker.css';
import { TimePicker } from 'antd'; // นำเข้าไลบรารี TimePicker
import dayjs from 'dayjs'; // นำเข้าไลบรารี dayjs

function TimePickerTa({ onStartTimeChange, onEndTimeChange }) {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const handleStartTimeChange = (time) => {
        setStartTime(time);
        onStartTimeChange(time ? time.format('HH:mm') : null); // ส่งค่า startTime ในรูปแบบ 'HH:mm' กลับไปยังหน้าหลัก
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
        onEndTimeChange(time ? time.format('HH:mm') : null); // ส่งค่า endTime ในรูปแบบ 'HH:mm' กลับไปยังหน้าหลัก
    };

    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 7; i++) {
            hours.push(i); // ปิดชั่วโมงตั้งแต่ 00:00 ถึง 06:00
        }
        for (let i = 21; i < 24; i++) {
            hours.push(i); // ปิดชั่วโมงตั้งแต่ 21:00 ถึง 23:00
        }
        return hours;
    };

    return (
        <div>
            <div>
                <div>
                    <span className="timepicker-text">เริ่มต้น</span>
                    <TimePicker
                        value={startTime}
                        onChange={handleStartTimeChange}
                        defaultValue={dayjs('07:00', 'HH:mm')}
                        showNow={false}
                        format="HH:mm"
                        minuteStep={30} // กำหนดให้นับทุก 30 นาที
                        disabledHours={disabledHours} // ปิดชั่วโมงที่ไม่ต้องการเลือก
                        className="custom-time-picker2"
                    />
                </div>


                <div>
                    <span className="timepicker-text">สิ้นสุด</span>
                    <TimePicker
                        value={endTime}
                        onChange={handleEndTimeChange}
                        defaultValue={dayjs('07:00', 'HH:mm')}
                        showNow={false}
                        format="HH:mm"
                        minuteStep={30} // กำหนดให้นับทุก 30 นาที
                        disabledHours={disabledHours} // ปิดชั่วโมงที่ไม่ต้องการเลือก
                        className="custom-time-picker3"
                    />
                </div>
            </div>
        </div>
    );
}

export default TimePickerTa;