import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import SigninForm from "../../../components/authentication/SigninForm/SigninForm.js";
const Signin = () => {
    return (_jsx("div", { className: styles.login_container, children: _jsxs("div", { className: styles.login_form_container, children: [_jsx("div", { className: styles.left, children: _jsx(SigninForm, {}) }), _jsxs("div", { className: styles.right, children: [_jsx("h1", { children: "Nouveau ici ?" }), _jsx(Link, { to: "/signup", children: _jsx("button", { type: "button", className: styles.white_btn, children: "S'inscrire" }) })] })] }) }));
};
export default Signin;
