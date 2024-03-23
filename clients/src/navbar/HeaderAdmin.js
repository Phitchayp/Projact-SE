import React from "react";
import "./HeaderAdmin.css";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const nav = useNavigate();

  const logout = async () => {
    try {
      nav("/");
      sessionStorage.clear();
      window.location.reload()
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="HeaderAdmin-header">
      <img src="/noti.png" alt="Notification Icon" className="HeaderAdmin-notification-icon" />
      <span className="HeaderAdmin-HeaderAdmin-admin-text">admin</span>
      <div onClick={logout} style={{ cursor: 'pointer' }}>
        <img className="HeaderAdmin-logout-icon" src="/logout.png" alt="Logout Icon" />
      </div>
    </header>
  );
};

export default HeaderAdmin;
