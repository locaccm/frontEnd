// Type for user profile information
export interface UserProfile {
    photo: string | ArrayBuffer | null;
    prenom: string;
    nom: string;
    email: string;
    adresse: string;
    datenaissance: string;
}