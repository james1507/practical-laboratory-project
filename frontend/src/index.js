import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Provider } from "react-redux";
import store from "./redux/Store.js";

import { registerLicense } from "@syncfusion/ej2-base";

import { loadCldr, L10n, setCulture } from "@syncfusion/ej2-base";
import * as n1 from "../node_modules/cldr-data/main/vi/currencies.json";
import * as n2 from "../node_modules/cldr-data/main/vi/timeZoneNames.json";
import * as n3 from "../node_modules/cldr-data/main/vi/numbers.json";
import * as n4 from "../node_modules/cldr-data/main/vi/ca-gregorian.json";
import * as s from "../node_modules/cldr-data/supplemental/currencyData.json";
import * as s2 from "../node_modules/cldr-data/supplemental/numberingSystems.json";
import { useSelector } from "react-redux";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF1cXGFCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXZeeHRWR2hcU0Z/VkA="
);

// Load the Vietnamese CLDR data
loadCldr(n1, n2, n3, n4, s, s2); 
setCulture("vi");

// Set the culture to Vietnamese
L10n.load({
  vi: {
    schedule: {
      day: "Ngày",
      week: "Tuần",
      workWeek: "Tuần làm việc",
      month: "Tháng",
      agenda: "Chương trình",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : (
          <Route path="/auth/*" element={<AuthLayout />} />
        )}
        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? "/admin/index" : "/auth/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
