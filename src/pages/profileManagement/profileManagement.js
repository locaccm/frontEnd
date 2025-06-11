import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./styles.module.css";
import ProfileForm from "../../components/profilManagement/ProfileForm.js";
const Profile = () => {
    return (_jsx("div", { className: styles.login_container, children: _jsxs("div", { className: styles.login_form_container, children: [_jsx("div", { className: styles.right, children: _jsx("h1", { children: "Modifier vos informations" }) }), _jsx("div", { className: styles.left, children: _jsx(ProfileForm, {}) })] }) }));
};
export default Profile;
