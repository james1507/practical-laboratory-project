import Index from "views/Home/Index.js";
import Profile from "views/Profile/Profile.js";
import Register from "views/Register/Register.js";
import Login from "views/Login/Login.js";
import RegisterPracticeRoom from "views/RegisterPraticeRoomDetails/RegisterPracticeRoom";
import RegisterBorrowEquipment from "views/RegisterBorrowEquipment/RegisterBorrowEquipment";
import ListPracticeRoom from "views/ListPracticeRoom/ListPracticeRoom";
import ListAllUser from "views/ListAllUser/ListAllUser";
import UpdatePracticeRoom from "views/UpdatePracticeRoom/UpdatePracticeRoom";
import ListAllEquipment from "views/RegisterBorrowEquipment/ListAllEquipment";
import ListAllPracticeRoom from "views/RegisterPracticeRoom/ListAllPracticeRoom";
import RegisterPracticeRoomLearn from "views/RegisterPracticeRoom/RegisterPracticeRoom";
import ListAllSubjects from "views/RegisterSubjects/ListAllSubjects";
import RegisterSubjects from "views/RegisterSubjects/RegisterSubjects";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-register-practice-room",
    name: "Đăng ký phòng thực hành",
    icon: "ni ni-laptop text-yellow",
    component: <RegisterPracticeRoom />,
    layout: "/admin",
    isAdminOrModerator: false,
    isAdmin: false,
  },
  {
    path: "/user-update-practice-room",
    name: "Cập nhật thông tin",
    icon: "ni ni-laptop text-yellow",
    component: <UpdatePracticeRoom />,
    layout: "/admin",
    isAdminOrModerator: false,
  },
  {
    path: "/tables",
    name: "Danh sách phòng thực hành",
    icon: "ni ni-ui-04 text-green",
    component: <ListPracticeRoom />,
    layout: "/admin",
    isAdminOrModerator: false,
  },
  {
    path: "/user-management",
    name: "Quản lý nhân sự",
    icon: "ni ni-laptop text-yellow",
    component: <ListAllUser />,
    layout: "/admin",
    isAdminOrModerator: false,
    isAdmin: false,
  },
  {
    path: "/user-equipment",
    name: "Quản lý thiết bị",
    icon: "ni ni-settings text-green",
    component: <ListAllEquipment />,
    layout: "/admin",
  },
  {
    path: "/user-practice-room-learn",
    name: "Quản lý phòng thực hành",
    icon: "ni ni-settings text-green",
    component: <ListAllPracticeRoom />,
    layout: "/admin",
    isAdminOrModerator: false,
    isAdmin: false,
  },
  {
    path: "/user-subjects",
    name: "Quản lý môn học",
    icon: "ni ni-settings text-green",
    component: <ListAllSubjects />,
    layout: "/admin",
    isAdminOrModerator: false,
    isAdmin: false,
  },
  // {
  //   path: "/tables",
  //   name: "Đăng ký mượn thiết bị",
  //   icon: "ni ni-ui-04 text-green",
  //   component: <RegisterBorrowEquipment />,
  //   layout: "/admin",
  //   isAdminOrModerator: true,
  // },
  // {
  //   path: "/user-register-borrow-equipment",
  //   name: "Đăng ký mượn thiết bị",
  //   icon: "ni ni-ui-04 text-green",
  //   component: <RegisterBorrowEquipment />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "Thông tin cá nhân",
    icon: "ni ni-single-02 text-grey",
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
  {
    path: "/create-equipment",
    name: "Tạo thiết bị mới",
    icon: "ni ni-settings text-green",
    component: <RegisterBorrowEquipment />,
    layout: "/admin",
    isHide: true,
  },
  {
    path: "/create-practice-room-learn",
    name: "Tạo phòng thực hành mới",
    icon: "ni ni-settings text-green",
    component: <RegisterPracticeRoomLearn />,
    layout: "/admin",
    isHide: true,
  },
  {
    path: "/create-subjects",
    name: "Tạo môn học mới",
    icon: "ni ni-settings text-green",
    component: <RegisterSubjects />,
    layout: "/admin",
    isHide: true,
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
];

export default routes;
