import {
  CHANGE_HE_THONG_RAP_ACTION,
  LAY_DANH_SACH_PHIM_ACTION,
  LAY_HE_THONG_CUM_RAP_ACTION,
  LAY_HE_THONG_RAP_ACTION,
  THEM_PHIM_MOI_ACTION,
  THONG_TIN_LICH_CHIEU_ACTION,
} from "../const/QuanLyPhimConst";

const stateDefault = {
  danhSachPhim: [],
  thongTinCumRap: [],
  thongTinHeThongRap: [],
  thongTinLichChieu: {},

  heThongRap: [],
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHIM_ACTION: {
      state.danhSachPhim = action.dsPhim;
      return { ...state };
    }

    case THEM_PHIM_MOI_ACTION: {
      let danhSachPhimUpdate = [...state.danhSachPhim];
      danhSachPhimUpdate.push(action.phim);
      state.danhSachPhim = danhSachPhimUpdate;
      return { ...state };
    }

    case LAY_HE_THONG_CUM_RAP_ACTION: {
      state.thongTinCumRap = action.data;

      return { ...state };
    }

    case LAY_HE_THONG_RAP_ACTION: {
      state.thongTinHeThongRap = action.data;

      return { ...state };
    }

    case THONG_TIN_LICH_CHIEU_ACTION: {
      state.thongTinLichChieu = action.data;

      return { ...state };
    }

    case CHANGE_HE_THONG_RAP_ACTION: {
      let heThongRap = state.thongTinLichChieu.heThongRapChieu.find(
        (heThongRap) => {
          return heThongRap.maHeThongRap === action.heThongRap;
        }
      );

      state.heThongRap = heThongRap;

      return { ...state };
    }

    default:
      return { ...state };
  }
};
