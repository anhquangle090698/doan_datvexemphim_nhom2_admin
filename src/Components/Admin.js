import React from "react";
import logo from "../assets/img/logo-600x600_g2.png";
import "../assets/css/AdminTemplate.css";
import { useSelector } from "react-redux";

export default function Admin() {

  const { userLogin } = useSelector((state) => state.DangNhapReducer);

  return (
    <>
      <div className="admin-page">
        <img
          src={logo}
          alt={logo}
          className="logo-admin"
        />

        <h1 className="title-manage title-admin">Chào mừng {userLogin.taiKhoan} đã quay trở lại G2 Admin</h1>
      </div>
    </>
  );
}
