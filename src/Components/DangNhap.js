import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import "../assets/css/AdminTemplate.css";
import logo from "../assets/img/logo-600x600_g2.png";
import { DangNhapAction } from "../redux/actions/DangNhapAction";

export default function DangNhap() {
  
  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: { offset: 9, span: 6 },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-login">
      <div className="container-content-login">
        <div className="background-content-login">
          <img className="logo-login" src={logo}  alt={logo}/>
          <h1 className="title-login">ADMIN</h1>
          <Form
            {...layout}
            name="basic"
            onFinish={(userLogin) => {
              dispatch(DangNhapAction(userLogin));
            }}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tài Khoản"
              name="taiKhoan"
              rules={[
                { required: true, message: "Vui lòng nhập Tài Khoản!" },
              ]}
            >
              <Input placeholder="Tài Khoản" />
            </Form.Item>

            <Form.Item
              label="Mật Khẩu"
              name="matKhau"
              rules={[
                { required: true, message: "Vui lòng nhập Mật Khẩu!" },
              ]}
            >
              <Input.Password placeholder="Mật Khẩu" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
