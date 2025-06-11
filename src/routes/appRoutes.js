import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/authentication/Signup/Signup.js";
import Signin from "../pages/authentication/Signin/Signin.js";
import HousingManagement from "../pages/housingManagement/housingManagement.js";
import ProfileManagement from "../pages/profileManagement/profileManagement.js";
import WealthManagement from "../pages/wealthManagement/WealthManagementPage.js";
import DocumentManagement from "../pages/documentManagement/documentManagement.js";
import ChatBubble from "../pages/chatManagement/chatManagement.js";
const AppRoutes = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/chat", element: _jsx(ChatBubble, {}) }), _jsx(Route, { path: "/signin", element: _jsx(Signin, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/lease", element: _jsx(HousingManagement, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfileManagement, {}) }), _jsx(Route, { path: "/wealth-management", element: _jsx(WealthManagement, {}) }), _jsx(Route, { path: "/document-management/:leaseId", element: _jsx(DocumentManagement, { leaseId: 0, jwt: "", onClose: () => { } }) })] }) }));
};
export default AppRoutes;
