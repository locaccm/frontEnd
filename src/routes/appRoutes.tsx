import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/authentication/Signup/Signup.js";
import Signin from "../pages/authentication/Signin/Signin.js";
import HousingManagement from "../pages/housingManagement/housingManagement.js";
import WealthManagement from "../pages/wealthManagement/WealthManagementPage.js";
import Dashboard from "../pages/dashboardManagament/dashboardManagement.js";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lease" element={<HousingManagement  />} />
        <Route path="/wealth-management" element={<WealthManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
