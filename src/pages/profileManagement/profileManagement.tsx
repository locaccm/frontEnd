import styles from "./styles.module.css";
import ProfileForm from "../../components/profilManagement/ProfileForm.js";

const Profile = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.right}>
          <h1>Modifier vos informations</h1>
        </div>
        <div className={styles.left}>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
