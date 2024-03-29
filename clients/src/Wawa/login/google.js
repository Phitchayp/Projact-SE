import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Google = () => {
  const clientId = "903970944042-27p6mntuucj32e4nftg2v0ob9k5q2807.apps.googleusercontent.com"
  const nav = useNavigate();

  const responseGoogle = async (response) => {
    try {
      const userEmail = response.profileObj.email;
      const res = await axios.get(`http://localhost:3001/checkUserRole?emailUser=${userEmail}`);

      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("name", res.data.fullname);

      let redirectPath = "";
      if (res.data.role === 'admin') {
        redirectPath = "/AdminNoti";
      } else if (res.data.role === 'edu') {
        redirectPath = "/EduNoti";
      } else if (res.data.role === 'teacher') {
        redirectPath = "/TeacherNoti";
      }
  
      // เรียกใช้ Swal.fire ก่อนที่จะเปลี่ยนเส้นทาง
      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        confirmButtonColor: "#3CB371",
        customClass: {
          title: 'kanit-font',
          content: 'kanit-font',
          confirmButton: 'kanit-font',
          popup: 'kanit-font'
        }
      }).then(() => {
        // เปลี่ยนเส้นทางหลังจากที่ผู้ใช้กดปุ่มยืนยันใน Swal.fire
        nav(redirectPath);
        window.location.reload();
      });
  
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: 'ไม่พบผู้ใช้งาน กรุณา Login ใหม่อีกครั้ง',
            confirmButtonColor: "#3CB371",
            customClass: {
              title: 'kanit-font',
              content: 'kanit-font',
              confirmButton: 'kanit-font',
              popup: 'kanit-font'
            }
          });
        } else if (err.response.status === 408) {
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: 'การร้องขอใช้งานหมดเวลา กรุณา Login ใหม่อีกครั้ง',
            confirmButtonColor: "#3CB371",
            customClass: {
              title: 'kanit-font',
              content: 'kanit-font',
              confirmButton: 'kanit-font',
              popup: 'kanit-font'
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณา Login ใหม่อีกครั้ง',
          confirmButtonColor: "#3CB371",
          customClass: {
            title: 'kanit-font',
            content: 'kanit-font',
            confirmButton: 'kanit-font',
            popup: 'kanit-font'
          }
        });
      }
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};
export default Google;