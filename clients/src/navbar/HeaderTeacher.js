import React from "react";
import "./HeaderTeacher.css";
import LogoKU from '../assets/Logo.png';
import Swal from 'sweetalert2'; // Import SweetAlert
import Logout from '../assets/logout2.png';
import { useNavigate } from "react-router-dom";

const HeaderTeacher = () => {
  const nav = useNavigate();

  const logout = async () => {
    // Show confirmation popup
    Swal.fire({
      title: "ออกจากระบบ",
      text: "คุณต้องการที่จะออกจากระบบใช่หรือไม่?",
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
        try {
          nav("/");
          sessionStorage.clear();
          window.location.reload()
        }
        catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <header className="HeaderTeacher-header">

      <div className="HeaderTeacher-Ed-text-font"></div>
      <img src={LogoKU} alt="KU Logo" className="KU-logo" />

      <p className="HeaderTeacher-text">ระบบลงทะเบียนการสอน มหาวิทยาลัยเกษตรศาสตร์</p>

      <div className="HeaderTeacher-icon">
        {/* <img src="/noti.png" alt="Notification Icon" className="HeaderTeacher-notification-icon" /><p className="HeaderTeacher-text-icon">ติดต่อ</p> */}
        <span className="HeaderTeacher-Ed-text"></span>
        <div onClick={logout} style={{ cursor: 'pointer' }}>
          <img className="HeaderTeacher-logout-icon" src="/logout.png" alt="Logout Icon" />
          {/* <p className="HeaderTeacher-text-icon">ออกจากระบบ</p> */}
        </div>
      </div>


    </header>
  );
};

export default HeaderTeacher;
