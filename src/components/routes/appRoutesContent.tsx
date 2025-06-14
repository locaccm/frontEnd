import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/authentication/Signup/Signup.js";
import Signin from "../../pages/authentication/Signin/Signin.js";
import HousingManagement from "../../pages/housingManagement/housingManagement.js";
import ProfileManagement from "../../pages/profileManagement/profileManagement.js";
import WealthManagement from "../../pages/wealthManagement/WealthManagementPage.js";
import DocumentWrapper from "../../routes/DocumentWrapper.js"; 
import ChatBubble from "../../pages/chatManagement/chatManagement.js";
import MainLayout from "../../layout/MainLayout.js";
import Home from "../../pages/home.js";

const AppRoutesContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route element={<MainLayout />}>
      <Route path="/profile" element={<ProfileManagement />} />
      <Route path="/leases" element={<HousingManagement />} />
      <Route path="/wealth-management" element={<WealthManagement />} />
      <Route path="/document-management/:leaseId" element={<DocumentWrapper />} />
      <Route path="/contacts" element={<ChatBubble />} />
      <Route path="/calendar" element={<div>Calendar Page</div>} />
      <Route path="/properties" element={<div>Properties Page</div>} />
    </Route>
  </Routes>
);

export default AppRoutesContent;
