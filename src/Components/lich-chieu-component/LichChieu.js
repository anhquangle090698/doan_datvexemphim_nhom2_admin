import React, { useEffect, useState } from "react";
import { Tabs, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import '../../assets/css/QuanLyTemplate.css';
import {
  changeHeThongRapAction,
} from "../../redux/actions/QuanLyPhimAction";

const { TabPane } = Tabs;

export default function LichChieu() {
  const { thongTinLichChieu, heThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  const dispatch = useDispatch();

  const [stateCumRap, setStateCumRap] = useState(0);

  useEffect(() => {
    changeHeThongRap(0);
  },[]);

  const title = [
    {
      title: "Mã Lịch Chiếu",
      dataIndex: "maLichChieu",
      key: "maLichChieu",
    },
    {
      title: "Mã Rạp",
      dataIndex: "maRap",
      key: "maRap",
    },
    {
      title: "Tên Rạp",
      dataIndex: "tenRap",
      key: "tenRap",
    },
    {
      title: "Ngày Chiếu Giờ Chiếu",
      dataIndex: "ngayChieuGioChieu",
      key: "ngayChieuGioChieu",
    },
    {
      title: "Giá Vé",
      dataIndex: "giaVe",
      key: "giaVe",
    },
    {
      title: "Thời Lượng",
      dataIndex: "thoiLuong",
      key: "thoiLuong",
    },
  ];

  const changeHeThongRap = (indexHeThongRap) => {
    dispatch(
      changeHeThongRapAction(
        thongTinLichChieu.heThongRapChieu[indexHeThongRap].maHeThongRap
      )
    );
  };

  const changeCumRap = (value) => {
    setStateCumRap(value);
  };

  const renderCumRapChieu = () => {
    return heThongRap.cumRapChieu?.map((cumRap, index) => {
      return (
        <TabPane tab={cumRap.tenCumRap} key={index}>
          <Table
            columns={title}
            dataSource={heThongRap.cumRapChieu[stateCumRap]?.lichChieuPhim}
          />
        </TabPane>
      );
    });
  };

  const renderTabHeThongRap = () => {
    return thongTinLichChieu.heThongRapChieu?.map((infor, index) => {
      return (
        <TabPane
          tab={
            <span>
              <img
                src={infor.logo}
                alt={infor.logo}
                style={{ width: 50, height: 50, marginRight: "10px" }}
              ></img>
              {infor.tenHeThongRap}
            </span>
          }
          key={index}
        >
          <Tabs onChange={changeCumRap}>{renderCumRapChieu()}</Tabs>
        </TabPane>
      );
    });
  };

  return (
    <>
      <Tabs
        tabPosition={"left"}
        onChange={changeHeThongRap}
        onTabClick={()=>{
          setStateCumRap(0)
        }}
      >
        {renderTabHeThongRap()}
      </Tabs>
    </>
  );
}
