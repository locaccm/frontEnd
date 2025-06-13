import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import Accommodations from "../../../components/dashboardManagement/Accommodations.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock API module
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
      </AuthContext.Provider>,
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders accommodations when permission is granted and API returns data", async () => {
    api.get.mockResolvedValueOnce({ data: mockAccommodations });
    renderWithAuth(true);

    // Should show "Aucun logement" before data is fetched
    expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Appartement Centre Ville/)).toBeInTheDocument();
      expect(screen.getByText(/Villa Jardin/)).toBeInTheDocument();
      expect(
        screen.getByText(/3 pièces, lumineux, 2ème étage/),
      ).toBeInTheDocument();
      expect(screen.getByText(/grand jardin/)).toBeInTheDocument();
    });
  });

  it("renders error if API call fails", async () => {
    api.get.mockRejectedValueOnce(new Error("fail"));
    renderWithAuth(true);
    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les logements/),
      ).toBeInTheDocument();
    });
  });

  it("shows 'Aucun logement' if empty list", async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    renderWithAuth(true);
    await waitFor(() => {
      expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();
    });
  });

  it("renders loading/empty if no permission", () => {
    renderWithAuth(false);
    expect(screen.getByText(/Aucun logement/)).toBeInTheDocument();
  });
});
