// src/components/dashboardManagement/UserInfo.tsx
import { useEffect, useState } from "react";
import api from "../../core/apiExample.js";

type UserProfileAPI = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  address?: string;
  tel?: string;
  photoUrl?: string;
  bio?: string;
};

const UserInfo = ({ userId }: { userId: number }) => {
  const [profile, setProfile] = useState<UserProfileAPI | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/profiles/${userId}`)
      .then(res => setProfile(res.data))
      .catch(() => setError("Impossible de charger le profil"));
  }, [userId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div className="text-gray-500">Chargement...</div>;

  return (
    <div className="flex flex-col gap-1">
      <span><b>Nom :</b> {profile.lastName}</span>
      <span><b>Prénom :</b> {profile.firstName}</span>
      <span><b>Email :</b> {profile.address}</span>
      <span><b>Date de naissance :</b> {profile.birthDate && new Date(profile.birthDate).toLocaleDateString()}</span>
    </div>
  );
};

export default UserInfo;
