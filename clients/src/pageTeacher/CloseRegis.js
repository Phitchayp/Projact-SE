import React, { useState, useEffect } from 'react';
import './CloseRegis.css';
import { ReactComponent as Icon } from '../assets/warning.svg';

function CloseRegis() {
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const thaiDateTime = new Date().toLocaleString('th-TH', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
            setDateTime(thaiDateTime);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='turnleft-all' style={{ fontFamily:'kanit'}}>
            <div style={{color:'#CD5C5C' , fontSize:'15px'}}>
            {dateTime}
            </div>
            <div className='noti-text'>
                <Icon style={{ marginRight: '10px' }} />
                <span>ไม่อยู่ในกำหนดการลงทะเบียน</span>
            </div>
        </div>
    );
}

export default CloseRegis;
