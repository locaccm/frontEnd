import { useState, useCallback } from "react";
import {
  Lease,
  LeasePayload,
} from "../../types/housingManagement/housingManagement.js";

const API_BASE = `${import.meta.env.VITE_HOUSING_URL}/lease`;

export const useLeaseActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => sessionStorage.getItem("token");
  const getUserId = () => sessionStorage.getItem("userId");

  const fetchLeases = useCallback(async (): Promise<Lease[] | null> => {
    const userId = getUserId();
    if (!userId) {
      setError("Utilisateur non connecté.");
      return null;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des baux.");
      return await res.json();
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLease = useCallback(
    async (payload: Omit<LeasePayload, "USEN_ID">): Promise<boolean> => {
      const userId = getUserId();

      if (!userId) {
        setError("Utilisateur non connecté.");
        return false;
      }

      const body: LeasePayload = {
        ...payload,
        USEN_ID: Number(userId),
      };

      try {
        setLoading(true);
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(body),
        });

        const resText = await res.text();

        if (!res.ok) throw new Error(`Erreur API: ${res.status} - ${resText}`);
        return true;
      } catch (err) {
        console.error("Erreur dans createLease:", err);
        setError((err as Error).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateLease = useCallback(
    async (id: number, updates: Partial<LeasePayload>): Promise<boolean> => {
      const userId = getUserId();
      if (!userId) {
        setError("Utilisateur non connecté.");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ ...updates }),
        });

        if (!res.ok) throw new Error("Erreur lors de la mise à jour du bail.");
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

  const deleteLease = useCallback(async (id: number): Promise<boolean> => {
    const userId = getUserId();
    if (!userId) {
      setError("Utilisateur non connecté.");
      return false;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression du bail.");
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchLeases,
    createLease,
    updateLease,
    deleteLease,
  };
};
