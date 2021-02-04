import { combineReducers } from "redux";
import { QuanLyPhimReducer } from "./QuanLyPhimReducer";
import { QuanLyNguoiDungReducer } from './QuanLyNguoiDungReducer'
import { DangNhapReducer } from './DangNhapReducer'

export const rootReducer = combineReducers({
  QuanLyPhimReducer,
  QuanLyNguoiDungReducer,
  DangNhapReducer
});
