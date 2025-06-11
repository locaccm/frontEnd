import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import SignupForm from "../../../components/authentication/SignupForm/SignupForm.js";
const Signup = () => {
    return (_jsx("div", { className: styles.signup_container, children: _jsxs("div", { className: styles.signup_form_container, children: [_jsxs("div", { className: styles.left, children: [_jsxs("h1", { children: ["Bienvenue ", _jsx("br", {}), " de retour"] }), _jsx(Link, { to: "/signin", children: _jsx("button", { type: "button", className: styles.white_btn, children: "Se connecter" }) })] }), _jsx("div", { className: styles.right, children: _jsx(SignupForm, {}) })] }) }));
};
export default Signup;
