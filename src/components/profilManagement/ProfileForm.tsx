import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { setUserProfileData } from "../../core/session/SessionsManager.js";

type UserProfile = {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  tel: string;
  photoUrl?: string;
  bio?: string;
};

const ProfileForm = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
    tel: "",
    photoUrl: "",
    bio: "",
  });

  //const userId = 1; In DEV MODE
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!userId || !token) return;

        fetch(`${import.meta.env.VITE_PROFILE_URL}profiles/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement du profil");
                return res.json();
            })
            .then((data) => {
                const formattedBirthDate = data.birthDate
                    ? new Date(data.birthDate).toISOString().split("T")[0]
                    : "";

                setProfile({
                    ...data,
                    birthDate: formattedBirthDate,
                });
            })
            .catch((err) => {
                console.error("Erreur chargement profil :", err);
            });
    }, [userId, token]);

    if (!userId) {
        return <div>Utilisateur non connecté</div>;
    }


    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${import.meta.env.VITE_BUCKET_UPLOAD_URL}/upload/images`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload échoué");

            const data = await res.json();
            setProfile((prev) => ({ ...prev, photoUrl: data.path }));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'upload de l'image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            alert("Vous devez être connecté pour mettre à jour votre profil.");
            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_PROFILE_URL}profiles/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(profile),
                },
            );

            if (!res.ok) throw new Error("Échec mise à jour");

            alert("Profil mis à jour !");
            setUserProfileData(profile);
        } catch (err) {
            console.error("Erreur update profil :", err);
            alert("Erreur lors de la mise à jour");
        }
    };

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <h1>Mon Profil</h1>
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        value={profile.firstName}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        value={profile.lastName}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="date"
        name="birthDate"
        value={profile.birthDate}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="text"
        name="tel"
        placeholder="Téléphone"
        value={profile.tel}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="text"
        name="address"
        placeholder="Adresse"
        value={profile.address}
        onChange={handleChange}
        className={styles.input}
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={profile.bio}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={`${styles.image_upload}`}>
        {profile.photoUrl && (
          <img
            src={`${import.meta.env.VITE_BUCKET_UPLOAD_URL}/files/${profile.photoUrl}`}
            alt="Profile"
            className={styles.profile_image}
          />
        )}
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          aria-label="photo de profil"
        />
      </div>
      <button type="submit" className={styles.green_btn}>
        Enregistrer
      </button>
    </form>
  );
};

export default ProfileForm;
