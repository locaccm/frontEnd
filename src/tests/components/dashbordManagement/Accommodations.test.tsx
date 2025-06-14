import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import Accommodations from "../../../components/dashboardManagement/Accommodations.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock the API module used in the component
vi.mock("../../../core/api/dashbordManagement/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));
import api from "../../../core/api/dashbordManagement/api.js";

describe("Accommodations component", () => {
  const userId = 1;
  const mockAccommodations = [
    {
      ACCN_ID: 1,
      ACCC_NAME: "Appartement Centre Ville",
      ACCC_TYPE: "Appartement",
      ACCC_ADDRESS: "12 rue Victor Hugo",
      ACCC_DESC: "3 pièces, lumineux, 2ème étage",
    },
    {
      ACCN_ID: 2,
      ACCC_NAME: "Villa Jardin",
      ACCC_TYPE: "Maison",
      ACCC_ADDRESS: "25 chemin des Roses",
      ACCC_DESC: "5 pièces, grand jardin",
    },
  ];

  // Helper to render the component with a mocked AuthContext
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
        <Accommodations userId={userId} />
      </AuthContext.Provider>
    );
  }

  // Always clear mocks before each test to avoid side effects
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders accommodations when permission is granted and API returns data", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockResolvedValueOnce({ data: mockAccommodations });

    renderWithAuth(true);

    // Should show "Aucun logement" before loading the real data
    expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();

    // After fetch, should display accommodations data
    await waitFor(() => {
      expect(screen.getByText(/Appartement Centre Ville/)).toBeInTheDocument();
      expect(screen.getByText(/Villa Jardin/)).toBeInTheDocument();
      expect(
        screen.getByText(/3 pièces, lumineux, 2ème étage/)
      ).toBeInTheDocument();
      expect(screen.getByText(/grand jardin/)).toBeInTheDocument();
    });
  });

  it("renders error if API call fails", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockRejectedValueOnce(new Error("fail"));

    renderWithAuth(true);

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les logements/)
      ).toBeInTheDocument();
    });
  });

  it("shows 'Aucun logement' if empty list", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockResolvedValueOnce({ data: [] });

    renderWithAuth(true);

    await waitFor(() => {
      expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();
    });
  });

  it("renders loading/empty if no permission", () => {
    renderWithAuth(false);
    // When no permission, the component should show the empty placeholder
    expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();
  });
});
