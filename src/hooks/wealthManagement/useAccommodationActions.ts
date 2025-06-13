import { useState, useCallback } from "react";
import {
  Accommodation,
  AccommodationPayload,
} from "../../types/wealthManagement/wealthManagement.js";

const API_BASE = `${import.meta.env.VITE_WEALTH_MANAGEMENT_URL}/accommodations`;

export const useAccommodationActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => sessionStorage.getItem("token");

  const getUserId = () => sessionStorage.getItem("userId");

  const fetchAccommodations = useCallback(async (): Promise<
    Accommodation[] | null
  > => {
    const userId = getUserId();
    if (!userId) {
      setError("Utilisateur non connecté.");
      return null;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/read?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Échec du chargement des logements.");
      return await res.json();
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAccommodation = useCallback(
    async (payload: AccommodationPayload): Promise<boolean> => {
      const userId = getUserId();
      if (!userId) {
        setError("Utilisateur non connecté.");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            ...payload,
            USEN_ID: Number(userId),
          }),
        });

        if (!res.ok) throw new Error("Échec de la création du logement.");
        return true;
      } catch (err) {
        setError((err as Error).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateAccommodation = useCallback(
    async (id: number, updates: AccommodationPayload): Promise<boolean> => {
      const userId = getUserId();
      if (!userId) {
        setError("Utilisateur non connecté.");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(updates),
        });

        if (!res.ok) throw new Error("Échec de la mise à jour du logement.");
        return true;
      } catch (err) {
        setError((err as Error).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteAccommodation = useCallback(
    async (id: number): Promise<boolean> => {
      const userId = getUserId();
      if (!userId) {
        setError("Utilisateur non connecté.");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/delete/${id}`, {
          method: "DELETE",
          headers: {
            "user-id": userId,
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!res.ok) throw new Error("Échec de la suppression du logement.");
        return true;
      } catch (err) {
        setError((err as Error).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    fetchAccommodations,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
  };
};
