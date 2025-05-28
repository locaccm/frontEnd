import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SigninForm from "../../../components/authentication/SigninForm/SigninForm.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

beforeEach(() => {
  mockFetch.mockReset();
  alertMock.mockClear();
  sessionStorage.clear();
});

describe("SigninForm", () => {
  it("renders form correctly", () => {
    render(<SigninForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i }),
    ).toBeInTheDocument();
  });

  it("sends data and stores session on success", async () => {
    const fakeResponse = {
      token: "fake-token",
      user: {
        USEC_FNAME: "John",
        USEC_LNAME: "Doe",
        USEC_MAIL: "john@example.com",
        USED_BIRTH: "2000-01-01",
      },
    };

    mockFetch.mockResolvedValue({
      ok: true,
      body: {},
      json: async () => fakeResponse,
    });

    render(<SigninForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@example.com", name: "USEC_MAIL" },
    });
    fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
      target: { value: "password123", name: "USEC_PASSWORD" },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Connexion réussie");
    });

    expect(sessionStorage.getItem("token")).toBe("fake-token");
    expect(sessionStorage.getItem("userFirstName")).toBe("John");
    expect(sessionStorage.getItem("userLastName")).toBe("Doe");
    expect(sessionStorage.getItem("userEmail")).toBe("john@example.com");
    expect(sessionStorage.getItem("userBirthDate")).toBe("2000-01-01");
  });

  it("shows alert on fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<SigninForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@example.com", name: "USEC_MAIL" },
    });
    fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
      target: { value: "password123", name: "USEC_PASSWORD" },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
