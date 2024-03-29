import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('role') !== null; // ตรวจสอบว่ามีการเข้าสู่ระบบแล้วหรือไม่
  
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/" />} // ถ้ายังไม่ได้เข้าสู่ระบบ ก็ redirect ไปที่หน้า login
    />
  );
};

export default PrivateRoute;