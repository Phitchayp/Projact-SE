import React, { useState, useEffect } from 'react';
import Axios from 'axios';  // Import Axios here
import bin from '..//assets/bin.png';
import userIcon from '..//assets/userIcon.png';
import { AiOutlineUserDelete } from "react-icons/ai";
import Swal from 'sweetalert2';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:3001/get")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  

  const handleDeleteUser = async (userEmail) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${userEmail}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
      Swal.fire({
        title: "สำเร็จ",
        text: "ข้อมูลผู้ใช้ถูกลบสำเร็จ",
        icon: "success",
        confirmButtonColor: "#3CB371",
        customClass: {
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          cancelButton: 'kanit-font',
          popup: 'kanit-font'
        }
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      alert(`ลบข้อมูล ${userEmail} ไม่สำเร็จ`);
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
                  <h3>{user.fullname}</h3>
                  <p style={{ color:'black',marginTop:'-30px'}}>Email: {user.email}</p>
                </div>
              </div>
              <AiOutlineUserDelete
                style={{ width: '30px', height: '30px', cursor: 'pointer',color:'black',marginRight:'8px' }}
                
                onClick={() => {
                  Swal.fire({
                    title: "ลบข้อมูลผู้ใช้งาน",
                    text: `ต้องการลบข้อมูลผู้ใช้ Email : ${user.email}`,
                    text2:' ออกจากระบบ?',
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3CB371",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ยืนยัน",
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
                      handleDeleteUser(user.email);
                    }
                  });
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
