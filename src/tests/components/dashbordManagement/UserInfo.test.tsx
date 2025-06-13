import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import UserInfo from "../../../components/dashboardManagement/UserInfo.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock the API module used by UserInfo.
// This allows us to control its responses during tests.
vi.mock("../../../core/api/dashbordManagement/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Import the mocked API for assertion and setup
import api from "../../../core/api/dashbordManagement/api.js";

// Define the test suite for the UserInfo component
describe("UserInfo component", () => {
  // A constant userId for testing
  const userId = 1;
  // Sample profile data returned by the API mock
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
   * Utility to render the UserInfo component within a mocked AuthContext.
   * @param hasPermission - Simulate if the user has permission.
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
      </AuthContext.Provider>,
    );
  }

  // Reset all mocks before each test to prevent state leaks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: Should render the user's profile info when the API returns data and permission is granted.
   */
  it("renders profile when API returns data and permission is granted", async () => {
    // Arrange: mock the API call to resolve with mockProfile
    api.get.mockResolvedValueOnce({ data: mockProfile });
    renderWithAuth(true);

    // Assert: the loading state is shown first
    expect(screen.getByText(/Chargement/)).toBeInTheDocument();

    // Assert: wait for profile info to be displayed
    await waitFor(() => {
      expect(screen.getByText(/John/)).toBeInTheDocument();
      expect(screen.getByText(/Doe/)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
      expect(
        screen.getByText((_, el) =>
          el?.textContent === "Date de naissance : 1/1/1990"
        )
      ).toBeInTheDocument();
          });
  });

  /**
   * Test: Should show an error if the API call fails.
   */
  it("renders error if API call fails", async () => {
    // Arrange: mock the API call to reject
    api.get.mockRejectedValueOnce(new Error("fail"));
    renderWithAuth(true);

    // Assert: wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger le profil/),
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
