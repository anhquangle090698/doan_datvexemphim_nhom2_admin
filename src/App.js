import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './Components/Admin';
import QuanLyPhim from './Components/phim-component/QuanLyPhim';
import QuanLyNguoiDung from './Components/nguoi-dung-component/QuanLyNguoiDung';
import ThemPhimMoi from './Components/phim-component/ThemPhimMoi';
import ThemNguoiDungMoi from './Components/nguoi-dung-component/ThemNguoiDungMoi';
import QuanLyLichChieu from './Components/lich-chieu-component/QuanLyLichChieu';
import DangNhap from './Components/DangNhap';
import {  AdminTemplate  } from './Templates/AdminTemplate';

function App() {
  return (
    <Switch>
      <AdminTemplate exact path='/admin' Component={Admin}/>
      <AdminTemplate exact path='/admin/quan-ly-phim' Component={QuanLyPhim}/>
      <AdminTemplate exact path='/admin/quan-ly-nguoi-dung' Component={QuanLyNguoiDung}/>
      <AdminTemplate exact path='/admin/them-phim' Component={ThemPhimMoi}/>
      <AdminTemplate exact path='/admin/them-nguoi-dung' Component={ThemNguoiDungMoi}/>
      <AdminTemplate exact path='/admin/quan-ly-lich-chieu' Component={QuanLyLichChieu}/>
      <Route exact path='/dang-nhap' component={DangNhap}/>

      <AdminTemplate exact path='/admin' Component={DangNhap}></AdminTemplate>
      <Redirect to="/admin"/>
    </Switch>
  );
}

export default App;
