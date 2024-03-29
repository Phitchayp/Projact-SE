import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotiNoti() {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/box');
            if (response.data) {
                setBoxes(response.data);
            } else {
                console.error('Error: No data received from server');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const notiBoxStyle = {
        width: '1070px',
        height: 'auto',
        backgroundColor: '#127151',
        border: '2px solid white',
        borderStyle: 'dashed',
        borderRadius: '30px',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        flexDirection: 'row',
        margin:'10px',
        marginLeft:'50px'

    };

    return(
        <div>
            <div className='turnleft-all'>
                <h className='DateAdmin-text'>ข่าวสาร</h>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    {boxes.map((box, index) => (
                        <div key={box.id} style={notiBoxStyle}>
                            <p style={{ marginBottom: '20px' ,marginLeft: '20px',marginRight: '20px',color:'white',whiteSpace: 'pre-line',textAlign:'center'}}>{box.info}</p> 
                            {index !== boxes.length - 1 } 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotiNoti;
