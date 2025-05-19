import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const inviteTenantForm = () => {
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
            <h1>Inviter un locataire</h1>
            <input
                type="email"
                placeholder="Email du futur locataire"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
                Inviter
            </button>
        </form>

    );
};

export default inviteTenantForm;