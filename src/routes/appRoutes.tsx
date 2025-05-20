import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SigninForm from "../components/authentication/SigninForm/SigninForm.js";
import SignupForm from "../components/authentication/SignupForm/SignupForm.js";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
