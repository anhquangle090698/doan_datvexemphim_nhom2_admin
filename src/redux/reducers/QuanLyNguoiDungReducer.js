import {
  LAY_DANH_SACH_NGUOI_DUNG_ACTION,
  LAY_THONG_TIN_TAI_KHOAN,
  THEM_NGUOI_DUNG_MOI_ACTION,
} from "../const/QuanLyNguoiDungConst";

const stateDefault = {
  danhSachNguoiDung: [],
  user: {},
  thongTinTaiKhoan: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_NGUOI_DUNG_ACTION: {
      state.danhSachNguoiDung = action.dsNguoiDung;
      return { ...state };
    }

    case THEM_NGUOI_DUNG_MOI_ACTION: {
      state.user = action.user;

      //push user vào dsND

      return { ...state };
    }

    case LAY_THONG_TIN_TAI_KHOAN: {
      state.thongTinTaiKhoan = action.thongTinTaiKhoan;

      return { ...state };
    }

    default:
      return { ...state };
  }
};
