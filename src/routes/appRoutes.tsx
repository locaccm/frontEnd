import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SigninForm from "../components/authentication/SigninForm/SigninForm.js";
import SignupForm from "../components/authentication/SignupForm/SignupForm.js";
import InviteTenantForm from "../components/authentication/InviteTenantForm/InviteTenantForm.js";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<InviteTenantForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
