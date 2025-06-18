import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import SigninForm from "../../../components/authentication/SigninForm/SigninForm.js";

const Signin = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <SigninForm />
        </div>
        <div className={styles.right}>
          <h1>Nouveau ici ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              S'inscrire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
