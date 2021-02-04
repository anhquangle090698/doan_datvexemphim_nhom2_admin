import { DANG_NHAP_ACTION } from "../const/QuanLyNguoiDungConst";

let userSignInStorage = {};

localStorage.getItem("ADMIN_LOGIN")
  ? (userSignInStorage = JSON.parse(localStorage.getItem("ADMIN_LOGIN")))
  : (userSignInStorage = {});

const stateDefault = {
  userLogin: userSignInStorage,
};

export const DangNhapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
