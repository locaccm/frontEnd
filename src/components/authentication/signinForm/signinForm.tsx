import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const signinForm = () => {
    const [data, setData] = useState({ email: "", password: "" });

    const handleChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted with:", data);
        // Ici tu peux afficher une alerte ou juste rediriger vers une autre page plus tard
    };

    return (

        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Connectez-vous</h1>
            <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
                Se Connecter
            </button>
        </form>

    );
};

export default signinForm;