// src/core/sessionManager.ts
export const getUserId = () => sessionStorage.getItem("userId");
export const getToken = () => sessionStorage.getItem("token");
export const getEmail = () => sessionStorage.getItem("userEmail");
export const getUserProfileData = () => ({
    firstName: sessionStorage.getItem("userFirstName") || "",
    lastName: sessionStorage.getItem("userLastName") || "",
    birthDate: sessionStorage.getItem("userBirthDate") || "",
    photoUrl: sessionStorage.getItem("userPhotoUrl") || "",
    bio: sessionStorage.getItem("userBio") || "",
    tel: sessionStorage.getItem("userTel") || "",
    address: sessionStorage.getItem("userAddress") || "",
});
export const setUserProfileData = (data) => {
    sessionStorage.setItem("userFirstName", data.firstName);
    sessionStorage.setItem("userLastName", data.lastName);
    sessionStorage.setItem("userBirthDate", data.birthDate);
    if (data.photoUrl)
        sessionStorage.setItem("userPhotoUrl", data.photoUrl);
    if (data.bio)
        sessionStorage.setItem("userBio", data.bio);
    if (data.tel)
        sessionStorage.setItem("userTel", data.tel);
    if (data.address)
        sessionStorage.setItem("userAddress", data.address);
};
export const getEnvVar = (key) => (import.meta.env && import.meta.env[key]) || "http://localhost:3000/";
export const initUserProfileSession = async () => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    if (!userId)
        return;
    try {
        const res = await fetch(`${getEnvVar("VITE_PROFILE_URL")}profiles/${userId}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        if (res.ok) {
            const profile = await res.json();
            setUserProfileData(profile);
        }
    }
    catch (err) {
        console.error("Erreur récupération profil utilisateur :", err);
    }
};
