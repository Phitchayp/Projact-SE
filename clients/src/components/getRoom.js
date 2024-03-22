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
        <div>

            {rooms.map((rooms) => (
                <div key={rooms.id} className='Room-Items-open'>
                    <div className='checkbox-text'>{` ${rooms.building}`}</div>
                    <div className='checkbox-text2'>{`${rooms.room} `}</div>
                    <div className='checkbox-text3'>{`${rooms.quantity}`}</div>


                    {/* <div className='CheckboxOpenCourse-status'>สถานะ:</div> */}
                </div>
            ))}

            
        </div>
    );
};

export default RoomList;