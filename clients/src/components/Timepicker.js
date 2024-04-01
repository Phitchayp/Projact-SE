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

    return (
        <div>
            <div>
                <div>
                    <span className="timepicker-text">เริ่มต้น</span>
                    <TimePicker
                        value={startTime}
                        onChange={handleStartTimeChange}
                        defaultValue={dayjs('00:00', 'HH:mm')}
                        showNow={false}
                        format="HH:mm"
                        className="custom-time-picker2"
                    />
                </div>


                <div>
                    <span className="timepicker-text">สิ้นสุด</span>
                    <TimePicker
                        value={endTime}
                        onChange={handleEndTimeChange}
                        defaultValue={dayjs('00:00', 'HH:mm')}
                        showNow={false}
                        format="HH:mm"
                        className="custom-time-picker3"
                    />
                </div>
            </div>
        </div>
    );
}

export default TimePickerTa;
