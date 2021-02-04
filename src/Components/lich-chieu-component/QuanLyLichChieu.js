import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Space, Input, Popconfirm, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "../../assets/css/QuanLyTemplate.css";
import {
  layDanhSachPhimApiAction,
  thongTinLichChieuActionApi,
} from "../../redux/actions/QuanLyPhimAction";
import LichChieu from "./LichChieu";

export default function QuanLyLichChieu() {
  const dispatch = useDispatch();

  let [stateMaPhim, setStateMaPhim] = useState();

  const { danhSachPhim } = useSelector((state) => state.QuanLyPhimReducer);

  useEffect(async () => {
    dispatch(await layDanhSachPhimApiAction());
  },[]);

  //MODAL SHOW INFOMATION PHIM
  const [visibleInfor, setVisibleInfor] = useState(false);
  const [confirmLoadingInfor, setConfirmLoadingInfor] = useState(false);

  const showModalInforPhim = () => {
    setVisibleInfor(true);
  };

  const handleOkInfor = () => {
    setConfirmLoadingInfor(true);

    setTimeout(() => {
      setVisibleInfor(false);
      setConfirmLoadingInfor(false);
    }, 2000);
  };

  const handleCancelInfor = () => {
    setVisibleInfor(false);
  };

  const handleInforPhim = () => {
    dispatch(thongTinLichChieuActionApi(stateMaPhim));
    setTimeout(() => {
      showModalInforPhim();
    }, 200);
  };

 
  const title = [
    {
      title: "Mã Phim",
      width: 60,
      dataIndex: "maPhim",
      key: "maPhim",
      fixed: "left",
    },
    {
      title: "Tên Phim",
      width: 60,
      dataIndex: "tenPhim",
      key: "tenPhim",
      fixed: "left",
    },
    {
      title: "Hình Ảnh",
      width: 65,
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      fixed: "left",
      render: (hinhAnh) => (
        <img src={hinhAnh} alt={hinhAnh} style={{ maxWidth: "200px" }}></img>
      ),
    },
    {
      title: "Phương Thức",
      key: "PhuongThuc",
      fixed: "right",
      width: 60,
      render: () => (
        <Space size="middle">
          <Popconfirm
            title={`THÔNG TIN LỊCH CHIẾU MÃ PHIM: ${stateMaPhim}?`}
            icon={<InfoCircleOutlined />}
            onConfirm={handleInforPhim}
          >
            <button className="btn-action btn-radius">
              Thông Tin lịch chiếu
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="title-manage">Quản Lý Lịch Chiếu</h1>
      
      <div className="container-table">
        <Table
          bordered
          columns={title}
          dataSource={danhSachPhim}
          scroll={{ x: 1300 }}
          pagination={{ pageSize: 5 }}
          onRow={(phim) => {
            return {
              onClick: (e) => {
                setStateMaPhim(phim.maPhim);
              },
            };
          }}
          rowKey={(e) => e.maPhim}
        />
      </div>

      <Modal
        visible={visibleInfor}
        onOk={handleOkInfor}
        confirmLoading={confirmLoadingInfor}
        onCancel={handleCancelInfor}
        width={1600}
      >
        <LichChieu />
      </Modal>
    </>
  );
}
