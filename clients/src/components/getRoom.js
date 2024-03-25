import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './getRoom.css'

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:3001/room")
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rooms data:', error);
            });
    }, []);

    return (
        <table >
            <tr className='Room-Items-open'>
              <th className='checkbox-text2'>ตึก</th>
              <th className='checkbox-text2'>เลขห้อง</th>
              <th className='checkbox-text2'>จำนวน(ที่นั่ง)</th>
            </tr>
            {rooms.map((rooms) => (
                <tbody>
                <tr key={rooms.id} className='Room-Items-open'>
                    <td className='checkbox-text'>{`${rooms.building}`}</td>
                    <td className='checkbox-text'>{`${rooms.room}`}</td>
                    <td className='checkbox-text'>{`${rooms.quantity}`}</td>
                    {/* <div className='CheckboxOpenCourse-status'>สถานะ:</div> */}
                </tr>
                </tbody>
            ))}
        </table>
    );
};

export default RoomList;