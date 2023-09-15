/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Home/Index.js";
import Profile from "views/Profile/Profile.js";
import Register from "views/Register/Register.js";
import Login from "views/Login/Login.js";
import RegisterPracticeRoom from "views/RegisterPraticeRoom/RegisterPracticeRoom";
import RegisterBorrowEquipment from "views/RegisterBorrowEquipment/RegisterBorrowEquipment";

var routes = [
  {
    path: "/index",
    name: "Trang chủ",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-register-practice-room",
    name: "Đăng ký phòng thực hành",
    icon: "ni ni-single-02 text-yellow",
    component: <RegisterPracticeRoom />,
    layout: "/admin",
  },
  {
    path: "/user-register-borrow-equipment",
    name: "Đăng ký mượn thiết bị",
    icon: "ni ni-single-02 text-yellow",
    component: <RegisterBorrowEquipment />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Thông tin cá nhân",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Đăng nhập",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Đăng ký",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
];

export default routes;
