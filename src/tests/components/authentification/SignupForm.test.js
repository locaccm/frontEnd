import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "../../../components/authentication/SignupForm/SignupForm.js";
import { vi, beforeEach, describe, it, expect } from "vitest";
let mockFetch;
beforeEach(() => {
    vi.restoreAllMocks();
    mockFetch = vi.fn();
    global.fetch = mockFetch;
    vi.spyOn(window, "alert").mockImplementation(() => { });
    Object.defineProperty(window, "location", {
        writable: true,
        value: { href: "", assign: vi.fn() },
    });
});
describe("SignupForm", () => {
    it("envoie les données si tout est rempli", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });
        render(_jsx(SignupForm, {}));
        fireEvent.change(screen.getByPlaceholderText("Prénom"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByPlaceholderText("Nom"), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "password" },
        });
        fireEvent.change(screen.getByPlaceholderText("Date de naissance"), {
            target: { value: "2000-01-01" },
        });
        fireEvent.click(screen.getByText("S'inscrire"));
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith("Inscription réussie, veuillez vous connecter");
            expect(window.location.href).toBe("/signin");
        });
    });
});
