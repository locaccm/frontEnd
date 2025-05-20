import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import SignupForm from "../../../components/authentication/SignupForm/SignupForm.js";

const Signup = () => {
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>
                        Bienvenue <br /> de retour
                    </h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Se connecter
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};

export default Signup;