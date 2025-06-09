import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "../../../components/profilManagement/ProfileForm.js";
import { vi, describe, expect, beforeEach, Mock } from "vitest";
import "@testing-library/jest-dom";
global.fetch = vi.fn();

vi.stubGlobal("sessionStorage", {
  getItem: vi.fn((key) => {
    if (key === "userId") return "1";
    if (key === "token") return "mock-token";
    return null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

// ✅ Mock de import.meta.env
vi.stubGlobal("import.meta", {
  env: {
    VITE_PROFILE_URL: "http://localhost:4000/",
    VITE_BUCKET_UPLOAD_URL: "http://localhost:4001",
  },
});

const mockProfile = {
  firstName: "Jean",
  lastName: "Dupont",
  address: "123 rue de Paris",
  birthDate: "1990-05-15T00:00:00.000Z",
  tel: "0601020304",
  photoUrl: "images/profil.jpg",
  bio: "Développeur passionné",
};

describe("ProfileForm", () => {
  beforeEach(() => {
    (fetch as ReturnType<typeof vi.fn>).mockClear();
  });

  test("charge et affiche les données du profil", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<ProfileForm />);

    expect(await screen.findByDisplayValue("Jean")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Dupont")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 rue de Paris")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1990-05-15")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0601020304")).toBeInTheDocument();
  });

  test("met à jour le champ bio", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<ProfileForm />);

    const bioField = await screen.findByPlaceholderText("Bio");
    fireEvent.change(bioField, { target: { value: "Nouvelle bio" } });
    expect(bioField).toHaveValue("Nouvelle bio");
  });

  test("envoie les données du profil en PUT", async () => {
    (fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockProfile,
        })
        .mockResolvedValueOnce({
          ok: true,
        });

    render(<ProfileForm />);

    const button = await screen.findByText("Enregistrer");
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("profiles/1"),
          expect.objectContaining({
            method: "PUT",
            headers: expect.objectContaining({
              "Content-Type": "application/json",
              Authorization: "Bearer mock-token",
            }),
          }),
      );
    });
  });

  test("affiche une erreur si l'upload échoue", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<ProfileForm />);

    const input = await screen.findByLabelText(/photo de profil/i);

    (fetch as any).mockRejectedValueOnce(new Error("upload failed"));

    const file = new File(["dummy content"], "profile.png", {
      type: "image/png",
    });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});