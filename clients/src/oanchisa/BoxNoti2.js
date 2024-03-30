import React, { useState, useEffect } from 'react';
import plus from '../assets/plus.svg';
import './BoxNoti.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function BoxNoti2() {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [boxes, setBoxes] = useState([]);
    const [isDataSaved, setDataSaved] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/box');
            setBoxes(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        setInputValue('');
    };

    const handleSaveButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:3001/box1', { inputValue });
            const savedData = response.data;
            console.log('Saved value:', savedData);
            setInputValue('');
            handlePopupClose();
            setDataSaved(true);
            Swal.fire({
                title: "คุณต้องการเพิ่มประกาศใหม่",
                text: "คุณแน่ใจหรือไม่ว่าต้องการเพิ่มประกาศใหม่?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); // ย้อนกลับไปหน้าก่อนหน้านี้
                }
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted Value:', inputValue);
        await handleSaveButtonClick(); // Wait for saving data
    };

    const handleDeleteBox = async (boxId) => {
        try {
            Swal.fire({
                title: "ลบข้อมูล",
                text: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                customClass: {
                    title: 'kanit-font',
                    content: 'kanit-font',
                    confirmButton: 'kanit-font',
                    cancelButton: 'kanit-font',
                    popup: 'kanit-font'
                  }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:3001/box1/${boxId}`);
                    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxId));
                    setDataSaved(true);
                    Swal.fire({
                        title: "Deleted!",
                        text: "ข้อมูลประกาศถูกลบ",
                        icon: "success",
                        customClass: {
                            title: 'kanit-font',
                            content: 'kanit-font',
                            confirmButton: 'kanit-font',
                            cancelButton: 'kanit-font',
                            popup: 'kanit-font'
                          }
                    });
                }
            });
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const newBoxStyle = {
        width: '1070px',
        height: 'auto',
        backgroundColor: '#127151',
        border: '2px solid white',
        borderStyle: 'dashed',
        borderRadius: '30px',
        display: 'flex',
        marginTop:'5px',
        marginLeft:'10px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '170px',
        left: '44px',
        flexDirection: 'row',
        margin: '10px',
    };

    return (
        <>
            <div>
                <div className='turnleft-all' style={{ fontFamily:'kanit' }}>
                    <h className='DateAdmin-text'>สร้างประกาศ</h>
                    <button className='box-noti' onClick={handleButtonClick} style={{ marginTop: '35px', marginLeft: '-40px' }}>
                        <img src={plus} className="plus" alt="plus" />
                        <p className="text-under-img" style={{fontFamily: 'Kanit, sans-serif'}}>เพิ่มประกาศใหม่</p>
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        {boxes.map((box, index) => (
                            <div key={box.id} className='box-noti' style={newBoxStyle}>
                                <span
                                    className="delete-icon-noti"
                                    style={{ position: 'absolute', cursor: 'pointer', color: 'white' }}
                                    onClick={() => {
                                        handleDeleteBox(box.id);
                                    }}
                                >
                                </span>
                                <p style={{ marginBottom: '20px' ,marginLeft: '20px',marginRight: '20px',color:'white',whiteSpace: 'pre-line',textAlign:'center'}}>{box.info}</p> 
                                {index !== boxes.length - 1 && <hr style={{ margin: '10px 0'}} />} 
                                <div>
                                    <div
                                        style={{ 
                                            position: 'absolute', 
                                            cursor: 'pointer', 
                                            top: '5px',
                                            color: 'white', 
                                            right: '5px' ,
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onClick={() => {
                                            handleDeleteBox(box.id);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isPopupVisible && (
                <div className='popup-addmin'>
                    <div className='false-noti'>
                        <div className="popup-noti" style={{ width: '550px', height: '380px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                                <div className="form-group" style={{ width: '100%' }}>
                                    <textarea
                                        className="form-control" style={{ fontFamily:'kanit' }}
                                        id="inputField"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                    <div className="popup-buttonnoti">
                                        <button onClick={handlePopupClose} className="btn-secondary-noti ml-auto" >Cancel</button>
                                        <button type="submit" className="btn-primary-noti ml-auto">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BoxNoti2;
