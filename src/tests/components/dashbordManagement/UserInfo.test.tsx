import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import UserInfo from "../../../components/dashboardManagement/UserInfo.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock the API module used by UserInfo.
vi.mock("../../../core/api/dashbordManagement/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Import the mocked API for assertion and setup
import api from "../../../core/api/dashbordManagement/api.js";

describe("UserInfo component", () => {
  // Static userId for all tests
  const userId = 1;

  // Sample profile data to return from the mock
  const mockProfile = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01T00:00:00Z",
    address: "john@example.com",
    tel: "0600000000",
    photoUrl: "",
    bio: "",
  };

  /**
   * Utility to render the UserInfo component inside a fake AuthContext.
   * @param hasPermission - Should we simulate that the user has permission?
   */
  function renderWithAuth(hasPermission = true) {
    return render(
      <AuthContext.Provider
        value={{
          user: null,
          token: null,
          hasPermission: () => hasPermission,
          login: () => {},
          logout: () => {},
        }}
      >
        <UserInfo userId={userId} />
      </AuthContext.Provider>
    );
  }

  // Clear all mock calls before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: Should render the user's profile info when the API returns data and permission is granted.
   */
  it("renders profile when API returns data and permission is granted", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockResolvedValueOnce({ data: mockProfile });

    renderWithAuth(true);

    // Assert loading message appears first
    expect(screen.getByText(/Chargement/)).toBeInTheDocument();

    // Assert profile info is rendered
    await waitFor(() => {
      expect(screen.getByText(/John/)).toBeInTheDocument();
      expect(screen.getByText(/Doe/)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/)).toBeInTheDocument();

      // Vérifie que la date de naissance apparaît bien dans un span complet (pour éviter le plantage sur "multiple elements")
      const birthdateMatches = screen.getAllByText((_, el) => {
        if (!el || !el.textContent) return false;
        return el.textContent.replace(/\s+/g, " ").includes("Date de naissance : 1/1/1990") ||
               el.textContent.replace(/\s+/g, " ").includes("Date de naissance : 01/01/1990");
      });
      expect(birthdateMatches.length).toBeGreaterThan(0);
    });
  });

  /**
   * Test: Should show an error if the API call fails.
   */
  it("renders error if API call fails", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockRejectedValueOnce(new Error("fail"));

    renderWithAuth(true);

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger le profil/)
      ).toBeInTheDocument();
    });
  });

  /**
   * Test: Should display loading if user does not have permission.
   */
  it("renders loading if no permission", () => {
    renderWithAuth(false);
    expect(screen.getByText(/Chargement/)).toBeInTheDocument();
  });
});
