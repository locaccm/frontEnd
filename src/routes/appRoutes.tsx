import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/authentication/Signup/Signup.js";
import Signin from "../pages/authentication/Signin/Signin.js";
import WealthManagement from "../pages/wealthManagement/WealthManagementPage.js";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wealth-management" element={<WealthManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
