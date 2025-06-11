import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/authentication/Signup/Signup.js";
import Signin from "../pages/authentication/Signin/Signin.js";
import ChatBubble from "../pages/chatManagement/ChatManagement.js";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatBubble />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
