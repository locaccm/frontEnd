import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
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

export default Login;
