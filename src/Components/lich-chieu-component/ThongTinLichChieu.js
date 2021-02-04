import React, { useEffect, useState } from "react";
import { Select, DatePicker, Form, Input, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinHeThongCumRapActionApi,
  themLichChieuActionApi,
} from "../../redux/actions/QuanLyPhimAction";

export default function ThongTinLichChieu(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onResetForm = () => {
    form.resetFields();
  };

  const [stateHeThongRap, setStateHeThongRap] = useState("BHDStar");
  const [stateCumRap, setStateCumRap] = useState("");

  const changeStateHeThongRap = (value, res) => {
    setStateHeThongRap(value);
    dispatch(layThongTinHeThongCumRapActionApi(value));
  };

  const changeStateCumRap = (value, res) => {
    setStateCumRap(res.key);
  };

  useEffect(() => {
    dispatch(layThongTinHeThongCumRapActionApi(stateHeThongRap));
  },[]);

  const thongTinCumRapReducer = useSelector(
    (state) => state.QuanLyPhimReducer.thongTinCumRap
  );

  const thongTinHeThongRapReducer = useSelector(
    (state) => state.QuanLyPhimReducer.thongTinHeThongRap
  );

  const { thongTinLichChieu } = useSelector((state) => state.QuanLyPhimReducer);

  console.log(thongTinLichChieu.maPhim);

  const dispatchThemLichChieu = (lichChieuPhim) => {
    dispatch(themLichChieuActionApi(lichChieuPhim));
    onResetForm();
  };

  let [formatNgayChieuGioChieu, setFormatNgayChieuGioChieu] = useState("");

  const { Option } = Select;

  function onChangeDate(value, dateString) {
    let formatNgayGio = moment(dateString).format("DD/MM/YYYY HH:mm:ss");
    setFormatNgayChieuGioChieu(formatNgayGio);
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <>
      <h1 className="title-manage">Thêm Lịch Chiếu Phim</h1>
      <h2 className="title-manage">Mã Phim: '{thongTinLichChieu.maPhim}'</h2>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={(values) => {
          const lichChieuPhim = {
            maPhim: thongTinLichChieu.maPhim,
            ngayChieuGioChieu: formatNgayChieuGioChieu,
            maRap: values.maRap,
            giaVe: values.giaVe,
          };

          dispatchThemLichChieu(lichChieuPhim);
        }}
      >
        <Form.Item
          label="Hệ Thống Rạp"
          name="heThongRap"
          rules={[{ required: true, message: "Vui lòng chọn Hệ Thống Rạp!" }]}
          initialValue={stateHeThongRap}
        >
          <Select
            onChange={changeStateHeThongRap}
            style={{ width: 200 }}
            placeholder="Hệ Thống Rạp"
          >
            {thongTinHeThongRapReducer.map((heThongRap, index) => (
              <Option key={index} value={heThongRap.maHeThongRap}>
                {heThongRap.tenHeThongRap}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Cụm Rạp"
          name="cumRap"
          rules={[{ required: true, message: "Vui lòng chọn Cụm Rạp!" }]}
          initialValue={null}
        >
          <Select
            style={{ width: 350 }}
            placeholder="Cụm Rạp"
            onChange={changeStateCumRap}
            value={stateCumRap}
          >
            {thongTinCumRapReducer?.map((cumRap, index) => {
              return (
                <Option key={index} value={cumRap.maCumRap}>
                  {cumRap.tenCumRap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Rạp Chiếu"
          name="maRap"
          rules={[{ required: true, message: "Vui lòng chọn Rạp Chiếu!" }]}
          initialValue={null}
        >
          <Select style={{ width: 200 }} placeholder="Rạp Chiếu">
            {thongTinCumRapReducer[stateCumRap]?.danhSachRap.map(
              (rap, index) => {
                return (
                  <Option key={index} value={rap.maRap}>
                    {rap.tenRap}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Giá Vé"
          name="giaVe"
          rules={[{ required: true, message: "Vui lòng nhập Giá Vé!" }]}
        >
          <Input placeholder="Giá Vé" type="number" />
        </Form.Item>
        <Form.Item
          label="Ngày Chiếu - Giờ Chiếu"
          name="ngayChieuGioChieu"
          rules={[
            { required: true, message: "Vui lòng chọn Ngày Chiếu Giờ Chiếu!" },
          ]}
        >
          <DatePicker
            showTime
            // format={"DD/MM/YYYY HH:mm:ss"}
            onChange={onChangeDate}
            placeholder="Thời gian chiếu"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button htmlType="submit">Thêm Lịch Chiếu</Button>
        </Form.Item>
      </Form>
    </>
  );
}
