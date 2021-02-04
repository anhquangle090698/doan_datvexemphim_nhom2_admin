import axios from "axios";
import { ACCESS_TOKEN } from "../../Utils/config";
import swal from "sweetalert2";
import { LAY_DANH_SACH_NGUOI_DUNG_ACTION, LAY_THONG_TIN_TAI_KHOAN, THEM_NGUOI_DUNG_MOI_ACTION } from "../const/QuanLyNguoiDungConst";

export const layDanhSachNguoiDungApiAction = (hoTen) => {
  return (dispatch) => {

    if(hoTen) {
      let promise = axios({
        url:
          `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02&tuKhoa=${hoTen}`,
        method: "GET",
      });
      promise.then((res) => {
        dispatch(layDanhSachNguoiDungApi(res.data));
      });
      promise.catch((err) => {
        console.log(err.response.data);
      });
    }else {
      let promise = axios({
        url:
          `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02`,
        method: "GET",
      });
      promise.then((res) => {
        dispatch(layDanhSachNguoiDungApi(res.data));
      });
      promise.catch((err) => {
        console.log(err.response.data);
      });
    }
   
  };
};



export const themNguoiDungMoiApiAction = (user) => {
  return (dispatch) => {
    let promise = axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    });
    promise.then((res) => {
      dispatch(themNguoiDungMoiAction(res.data));
      swal.fire({
        title: "Thêm Người Dùng Thành Công!",
        timer: 2500,
        icon: "success",
        confirmButtonColor: "orange",
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
      swal.fire({
        title: "Thêm Người Dùng Thất Bại!",
        html: err.response.data,
        icon: "error",
        confirmButtonColor: "orange",
      });
    });
  };
};


export const xoaNguoiDungApiAction = async (user) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        },
      });
      if ((await result).status !== 500) {
        dispatch(await layDanhSachNguoiDungApiAction());
        swal.fire({
          title: "Xóa Thành Công!",
          timer: 2500,
          icon: "success",
          confirmButtonColor: "orange",
        });
      } else {
        swal.fire({
          title: "Xóa Thất Bại!",
          icon: "error",
          confirmButtonColor: "orange",
        });
      }
    } catch (error) {
      swal.fire({
        title: "Xóa Thất Bại!",
        icon: "error",
        confirmButtonColor: "orange",
      });
    }
  };
};

export const ChinhSuaNguoiDungActionApi = async (user) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url:
          "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: user,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        },
      });
      if ((await result) !== 500) {
        dispatch(layDanhSachNguoiDungApiAction());
        swal.fire({
          title: "Chỉnh Sửa Thành Công!",
          timer: 2500,
          icon: "success",
          confirmButtonColor: "orange",
        });
      } else {
        swal.fire({
          title: "Chỉnh Sửa Thất Bại!",
          icon: "error",
          confirmButtonColor: "orange",
        });
      }
    } catch (error) {
      swal.fire({
        title: "Chỉnh Sửa Thất Bại!",
        icon: "error",
        confirmButtonColor: "orange",
      });
    }
  };
};


export const layThongTinTaiKhoanApiAction = async (taiKhoan) => {
  return async (dispatch) => {
    
    try {
        
      let result = await axios({
        url : 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
        method : 'POST',
        data : taiKhoan,
      });

      dispatch(await layThongTinTaiKhoanAction(result.data));

    } catch (error) {
      console.log(error.response);
    }
   
  };
}
export const themNguoiDungMoiAction = (user) => {
  return {
    type: THEM_NGUOI_DUNG_MOI_ACTION,
    user: user,
  };
};


export const layDanhSachNguoiDungApi = (data) => {
  return {
    type: LAY_DANH_SACH_NGUOI_DUNG_ACTION,
    dsNguoiDung: data,
  };
};

export const layThongTinTaiKhoanAction = (thongTinTaiKhoan) => {
  return {
    type : LAY_THONG_TIN_TAI_KHOAN,
    thongTinTaiKhoan,
  }
}