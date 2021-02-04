import React from "react";
import { Form, Button, Input, Radio } from "antd";
import '../../assets/css/QuanLyTemplate.css';
import { useDispatch, useSelector } from "react-redux";
import { ChinhSuaNguoiDungActionApi } from "../../redux/actions/QuanLyNguoiDungAction";

export default function ChinhSuaNguoiDung(props) {
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  const handleDispatchSuaNguoiDung = async (user) => {
    props.handleOkEditNguoiDung();
    dispatch(await ChinhSuaNguoiDungActionApi(user));
  };

  const [form] = Form.useForm();

  const onReset = () => {
    setTimeout(() => {
      form.resetFields();
    }, 3000);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  form.setFieldsValue({
    taiKhoan: thongTinTaiKhoan.taiKhoan,
    matKhau: thongTinTaiKhoan.matKhau,
    hoTen: thongTinTaiKhoan.hoTen,
    soDt: thongTinTaiKhoan.soDT,
    maLoaiNguoiDung: thongTinTaiKhoan.maLoaiNguoiDung,
    maNhom: thongTinTaiKhoan.maNhom,
    email: thongTinTaiKhoan.email,
  });

  return (
    <>
      <h1 className="title-manage">Chỉnh Sửa Người Dùng</h1>
      <h2 className="title-manage">Tài Khoản: {thongTinTaiKhoan.taiKhoan}</h2>
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={(values) => {
          const user = {
            taiKhoan: thongTinTaiKhoan.taiKhoan,
            matKhau: values.matKhau,
            email: values.email,
            soDt: values.soDt,
            maNhom: values.maNhom,
            maLoaiNguoiDung: values.maLoaiNguoiDung,
            hoTen: values.hoTen,
          };

          handleDispatchSuaNguoiDung(user);

          onReset();
        }}
      >
        <Form.Item
          name="matKhau"
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật Khẩu!",
            },
            {
              min: 10,
              message: "Vui lòng nhập Mật Khẩu tối thiểu 10 kí tự!",
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
              message:
                "Mật Khẩu có ít nhất 1 kí tự HOA,1 kí tự THƯỜNG, 1 kí tự SỐ, 1 kí tự ĐẶC BIỆT!",
            },
          ]}
        >
          <Input.Password placeholder="Mật Khẩu" />
        </Form.Item>

        <Form.Item
          name="xacNhanMatKhau"
          label="Xác Nhận Mật Khẩu"
          dependencies={["matKhau"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật Khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Vui lòng nhập đúng Mật Khẩu Xác Nhận!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác Nhận Mật Khẩu" />
        </Form.Item>

        <Form.Item
          label="Họ Và Tên"
          name="hoTen"
          rules={[
            { required: true, message: "Vui lòng nhập Họ Và Tên!" },
            {
              pattern: /^(?=.*[a-zA-Z\S])[ a-zA-Z0-9]+$/,
              message: "Vui lòng không nhập kí tự ĐẶC BIỆT",
            },
            {
              pattern: /[^0-9]/,
              message: "Vui lòng nhập Họ Tên không chứa SỐ",
            },
          ]}
        >
          <Input placeholder="Họ Và Tên" id="success" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateStatus="success"
          rules={[
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng Email!",
            },
            { required: true, message: "Vui lòng nhập Email!" },
          ]}
        >
          <Input placeholder="Email" id="success" />
        </Form.Item>

        <Form.Item
          label="Số Điện Thoại"
          name="soDt"
          rules={[
            { required: true, message: "Vui lòng nhập Số Điện Thoại!" },
            {
              pattern: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
              message: "Vui lòng nhập đúng định dạng Số Điện Thoại",
            },
          ]}
        >
          <Input placeholder="Số Điện Thoại" id="success" />
        </Form.Item>

        <Form.Item
          label="Mã nhóm"
          name="maNhom"
          validateStatus="success"
          rules={[{ required: true }]}
        >
          <Input id="success" disabled />
        </Form.Item>

        <Form.Item
          label="Loại Người Dùng"
          name="maLoaiNguoiDung"
          rules={[
            { required: true, message: "Vui lòng chọn Loại Người Dùng!" },
          ]}
        >
          <Radio.Group autoFocus={false}>
            <Radio value="QuanTri">Quản Trị</Radio>
            <Radio value="KhachHang">Khách Hàng</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button htmlType="submit">Chỉnh Sửa Người Dùng</Button>
        </Form.Item>
      </Form>
    </>
  );
}
