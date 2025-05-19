import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const authentification = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data submitted:", data);
        // À ce niveau, tu peux ajouter une logique ultérieure (validation front-end par exemple)
    };

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
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Créer un compte</h1>
                        <input
                            type="text"
                            placeholder="Prénom"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
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
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default authentification;