// src/components/dashboardManagement/UserInfo.tsx

import { useEffect, useState } from "react";
import api from "../../core/api/dashbordManagement/api.js";
import { useAuth } from "../../core/api/dashbordManagement/AuthContext.js";

/**
 * Represents the user profile structure returned by the API.
 */
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

/**
 * UserInfo component fetches and displays a user's profile information.
 * - Calls the backend API to fetch the profile for a given userId.
 * - Only fetches the profile if the user has the "getProfile" permission.
 * - Shows an error if the API call fails.
 * - Shows a loading state until the profile is loaded.
 *
 * @param {number} userId - The user ID to fetch profile for.
 */
const UserInfo = ({ userId }: { userId: number }) => {
  // Access permission-checking from auth context
  const { hasPermission } = useAuth();
  // Holds the fetched user profile
  const [profile, setProfile] = useState<UserProfileAPI | null>(null);
  // Holds any error message
  const [error, setError] = useState("");

  useEffect(() => {
    // Only fetch if user has permission and userId is provided
    if (hasPermission("getProfile") && userId) {
      api
        .get(`/profiles/${userId}`)
        .then((res) => setProfile(res.data))
        .catch(() => setError("Impossible de charger le profil"));
    }
  }, [userId, hasPermission]);

  // Render error message
  if (error) return <div className="text-red-500">{error}</div>;
  // Render loading state
  if (!profile) return <div className="text-gray-500">Chargement...</div>;

  // Render user profile
  return (
    <div className="flex flex-col gap-1">
      <span>
        <b>Nom :</b> {profile.lastName}
      </span>
      <span>
        <b>Prénom :</b> {profile.firstName}
      </span>
      <span>
        <b>Email :</b> {profile.address}
      </span>
      <span>
        <b>Date de naissance :</b>{" "}
        {profile.birthDate && new Date(profile.birthDate).toLocaleDateString()}
      </span>
    </div>
  );
};

export default UserInfo;
