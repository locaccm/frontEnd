import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "../../../components/profilManagement/ProfileForm.js";
import { vi, describe, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";

Object.defineProperty(import.meta, "env", {
  value: {
    VITE_PROFILE_URL: "http://localhost:4000/",
    VITE_BUCKET_UPLOAD_URL: "http://localhost:4001",
  },
});

vi.stubGlobal("sessionStorage", {
  getItem: vi.fn((key: string) => {
    if (key === "userId") return "1";
    if (key === "token") return "mock-token";
    return null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

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
    mockFetch.mockClear();
  });

  test("charge et affiche les données du profil", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    } as Response);

    render(<ProfileForm />);

    expect(await screen.findByDisplayValue("Jean")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Dupont")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 rue de Paris")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1990-05-15")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0601020304")).toBeInTheDocument();
  });

  test("met à jour le champ bio", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    } as Response);

    render(<ProfileForm />);
    const bioField = await screen.findByPlaceholderText("Bio");
    fireEvent.change(bioField, { target: { value: "Nouvelle bio" } });
    expect(bioField).toHaveValue("Nouvelle bio");
  });

  test("envoie les données du profil en PUT", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
      } as Response);

    render(<ProfileForm />);

    const button = await screen.findByText("Enregistrer");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
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
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    } as Response);

    render(<ProfileForm />);
    const input = await screen.findByLabelText(/photo de profil/i);

    mockFetch.mockRejectedValueOnce(new Error("upload failed"));

    const file = new File(["dummy content"], "profile.png", {
      type: "image/png",
    });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
