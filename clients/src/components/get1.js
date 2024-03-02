import React, { useState, useEffect } from 'react';
import Axios from "axios";
import bin from '..//assets/bin.png';
import userIcon from '..//assets/userIcon.png';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้งานจากเซิร์ฟเวอร์
    Axios.get("http://127.0.0.1:3001/get1")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); 

  const handleDeleteUser = async (userId) => {
    try {
      await Axios.delete(`http://localhost:3001/usersaj/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      // Assuming "setUsers" is the correct way to update your state after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <div key={index}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ width: '50px', height: '40px', marginRight: '10px' }}
                  src={userIcon}
                  alt="User Icon"
                />
                <div>
                  <p>Email: {user.email}</p>
                  <p>Full Name: {user.name}</p>
                </div>
              </div>
              <img
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                src={bin}
                alt="Delete Icon"
                onClick={() => {
                  if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) {
                    handleDeleteUser(user.id);
                  }
                }}
              />
            </li>
            <hr style={{ width: '900px', color: 'white', margin: '10px auto' }} />
          </div>
        ))}
      </ul>
    </div>
    
  );
};

export default UserList;
