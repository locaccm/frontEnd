import { useState } from "react";
import styles from "./styles.module.css";

const InviteTenantForm = () => {
  const [data, setData] = useState({ USEC_MAIL: "", ADDRESS: "" });

  const handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [input.name]: input.value });
  };

  const checkAllFieldsIsCompleted = () => {
    return Object.values(data).every((value) => value !== "");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Session expirée, veuillez vous reconnecter");
      window.location.href = "/signin";
      return;
    }
    
    if (!checkAllFieldsIsCompleted()) {
      alert("Il faut remplir tous les champs");
      return;
    }

    if (
      sessionStorage.getItem("userFirstName") == null ||
      sessionStorage.getItem("userLastName") == null
    ) {
      window.location.href = "/signin";
      return;
    }
    const ownerName =
      sessionStorage.getItem("userFirstName") +
      " " +
      sessionStorage.getItem("userLastName");

    const dataToSend = {
      ...data,
      OWNER_NAME: ownerName,
    };
    fetch(`${import.meta.env.VITE_AUTH_URL}/auth/invitetenant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async (response) => {
        if (response.ok && response.body !== null) {
          alert("Invitation réussie");
        } else {
          alert("Erreur lors de l'invitation, l'email a bien été envoyé mais l'inscription dans la base de données n'a pas été inscrit");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <h1>Inviter un locataire</h1>
      <input
        type="email"
        placeholder="Email du futur locataire"
        name="USEC_MAIL"
        onChange={handleChange}
        value={data.USEC_MAIL}
        required
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Adresse"
        name="ADDRESS"
        onChange={handleChange}
        value={data.ADDRESS}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.green_btn}>
        Inviter
      </button>
    </form>
  );
};

export default InviteTenantForm;
