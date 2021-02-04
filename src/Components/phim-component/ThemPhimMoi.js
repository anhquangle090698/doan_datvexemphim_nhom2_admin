import React from "react";
import { Form, Button, Upload, Rate, Input, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import '../../assets/css/QuanLyTemplate.css';
import { themPhimMoiApiAction } from "../../redux/actions/QuanLyPhimAction";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function ThemPhimMoi() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onReset = () => {
    setTimeout(() => {
      form.resetFields();
    }, 2000);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <h1 className="title-manage">Thêm Phim</h1>
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={(values) => {
          let formatNgayKhoiChieu = moment(values.ngayKhoiChieu).format(
            "DD/MM/yyyy"
          );

          let formatDanhGia = values.danhGia * 2;

          const phim = {
            hinhAnh: values.hinhAnh[0].originFileObj,
            maPhim: undefined,
            biDanh: values.biDanh,
            tenPhim: values.tenPhim,
            trailer: values.trailer,
            moTa: values.moTa,
            maNhom: "GP02",
            danhGia: formatDanhGia,
            ngayKhoiChieu: formatNgayKhoiChieu,
          };

          let form_data = new FormData();
          for (let key in phim) {
            form_data.append(key, phim[key]);
          }
          dispatch(themPhimMoiApiAction(form_data));

          onReset();
        }}
        initialValues={{
          maNhom : "GP02",
        }}
      >
        <Form.Item
          label="Tên Phim"
          name="tenPhim"
          rules={[{ required: true, message: "Vui lòng nhập Tên Phim!" }]}
        >
          <Input placeholder="Tên Phim" />
        </Form.Item>

        <Form.Item
          label="Bí Danh"
          name="biDanh"
          rules={[{ required: true, message: "Vui lòng nhập Bí Danh!" }]}
        >
          <Input placeholder="Bí Danh"/>
        </Form.Item>

        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[{ required: true, message: "Vui lòng nhập Trailer!" }]}
        >
          <Input placeholder="Trailer" type="url" />
        </Form.Item>

        <Form.Item
          name="hinhAnh"
          label="Hình Ảnh"
          valuePropName="file"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Vui lòng thêm Hình Ảnh!" }]}
        >
          <Upload name="hinhAnh" listType="picture" >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Mã nhóm"
          name="maNhom"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Ngày khởi chiếu"
          name="ngayKhoiChieu"
          rules={[{ required: true, message: "Vui chọn Ngày Khởi Chiếu!" }]}
        >
          <DatePicker placeholder="Ngày khởi chiếu" format={"DD/MM/yyyy"} />
        </Form.Item>

        <Form.Item name="danhGia" label="Đánh giá">
          <Rate />
        </Form.Item>

        <Form.Item name={"moTa"} label="Mô tả">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button htmlType="submit">Thêm Phim</Button>
        </Form.Item>
      </Form>
    </>
  );
}
