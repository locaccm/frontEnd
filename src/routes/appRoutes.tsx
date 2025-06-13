import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/authentication/Signup/Signup.js";
import Signin from "../pages/authentication/Signin/Signin.js";
import HousingManagement from "../pages/housingManagement/housingManagement.js";
import ProfileManagement from "../pages/profileManagement/profileManagement.js";
import WealthManagement from "../pages/wealthManagement/WealthManagementPage.js";
import DocumentManagement from "../pages/documentManagement/documentManagement.js";
import ChatBubble from "../pages/chatManagement/chatManagement.js";
import AdminDashbord from "../pages/adminManagement/adminManagement.js"
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatBubble />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lease" element={<HousingManagement />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/wealth-management" element={<WealthManagement />} />
        <Route path="/document-management/:leaseId" element={<DocumentManagement leaseId={0} jwt={""} onClose={() => {} } />} />
        <Route path="/admin" element={<AdminDashbord/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
