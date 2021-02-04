import React, { useState } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import logo from "../assets/img/logo-600x600_g2.png";
import "antd/dist/antd.css";
import { Layout, Menu, BackTop, Button } from "antd";
import {
  TeamOutlined,
  OrderedListOutlined,
  MediumOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import "../assets/css/AdminTemplate.css";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import { ADMIN_LOGIN } from "../Utils/config";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const { userLogin } = useSelector((state) => state.DangNhapReducer);

  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };

  const { Component, ...restParams } = props;
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        if (
          localStorage.getItem(ADMIN_LOGIN) &&
          userLogin.maLoaiNguoiDung === "QuanTri"
        ) {
          return (
            <>
              <Layout style={{ minHeight: "100vh" }}>
                <Sider
                  collapsible
                  collapsed={state.collapsed}
                  onCollapse={onCollapse}
                >
                  <Menu defaultSelectedKeys={["9"]} mode="inline">
                    <div className="information-user">
                      <img className="header__logo" src={logo} alt={logo}/>
                      {!state.collapsed ? (
                        <div className="name-user">{userLogin.hoTen}</div>
                      ) : (
                        <div className="name-user-small">{userLogin.hoTen}</div>
                      )}
                      {!state.collapsed ? (
                        <Button
                          className="btn-logout"
                          onClick={() => {
                            localStorage.removeItem("ADMIN_LOGIN");
                            localStorage.removeItem("ACCESS_TOKEN");
                            swal.fire({
                              title: "Đăng Xuất Thành Công!",
                              timer: 2500,
                              icon: "success",
                              confirmButtonColor: "orange",
                            });
                            setTimeout(() => {
                              swal.close();
                            }, 2000);
                          }}
                        >
                          <NavLink to="/dang-nhap">Đăng Xuất</NavLink>
                        </Button>
                      ) : (
                        <Button
                          className="btn-logout"
                          onClick={() => {
                            localStorage.removeItem("ADMIN_LOGIN");
                            localStorage.removeItem("ACCESS_TOKEN");
                            swal.fire({
                              title: "Đăng Xuất Thành Công!",
                              timer: 2500,
                              icon: "success",
                              confirmButtonColor: "orange",
                            });
                            setTimeout(() => {
                              swal.close();
                            }, 2000);
                          }}
                        >
                          <NavLink to="/dang-nhap">
                            <LogoutOutlined />
                          </NavLink>
                        </Button>
                      )}
                    </div>
                    <SubMenu key="sub1" icon={<MediumOutlined />} title="Movie">
                      <Menu.Item key="3">
                        <NavLink
                          className="text-orange"
                          to="/admin/quan-ly-phim"
                        >
                          Quản lý
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="4">
                        <NavLink className="text-orange" to="/admin/them-phim">
                          Thêm phim
                        </NavLink>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      icon={<TeamOutlined />}
                      title="Người Dùng"
                    >
                      <Menu.Item key="6">
                        <NavLink
                          className="text-orange"
                          to="/admin/quan-ly-nguoi-dung"
                        >
                          Quản lý
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="7">
                        <NavLink
                          className="text-orange"
                          to="/admin/them-nguoi-dung"
                        >
                          Thêm người dùng
                        </NavLink>
                      </Menu.Item>
                    </SubMenu>
                    <MenuItem key="8" icon={<OrderedListOutlined />}>
                      <NavLink
                        to="/admin/quan-ly-lich-chieu"
                        className="text-orange"
                      >
                        Quản Lý Lịch Chiếu
                      </NavLink>
                    </MenuItem>
                    <MenuItem key="9" icon={<HomeOutlined />}>
                      <NavLink to="/admin" className="text-orange">
                        Admin
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </Sider>
                <Layout className="site-layout">
                  <Content style={{ margin: "16px" }}>
                    <div
                      className="site-layout-background"
                      style={{ padding: 24, minHeight: 360 }}
                    >
                      <Component {...propsRoute} />
                    </div>
                  </Content>
                </Layout>
              </Layout>
              <BackTop />
            </>
          );
        }
        return <Redirect to="/dang-nhap"></Redirect>;
      }}
    />
  );
};
