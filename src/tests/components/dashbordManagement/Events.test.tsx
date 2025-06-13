import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import Events from "../../../components/dashboardManagement/Events.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock API module
vi.mock("../../../core/api/dashbordManagement/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));
import api from "../../../core/api/dashbordManagement/api.js";

describe("Events component", () => {
  const userId = 1;
  const mockEvents = [
    {
      id: 1,
      title: "Birthday",
      date: "2024-06-13T21:00:00.000Z",
      description: "Party at Alice's house.",
    },
    {
      id: 2,
      title: "Meeting",
      date: "2024-07-01T14:00:00.000Z",
      description: "Project kickoff with the team.",
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
        <Events userId={userId} />
      </AuthContext.Provider>,
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders events when permission is granted and API returns data", async () => {
    api.get.mockResolvedValueOnce({ data: mockEvents });
    renderWithAuth(true);

    // Initially show loading (list is empty so "Aucun événement" should appear)
    expect(screen.getByText(/Aucun événement/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Birthday/)).toBeInTheDocument();
      expect(screen.getByText(/Meeting/)).toBeInTheDocument();
      expect(screen.getByText(/Party at Alice's house/)).toBeInTheDocument();
      expect(
        screen.getByText(/Project kickoff with the team/),
      ).toBeInTheDocument();
    });
  });

  it("renders error if API call fails", async () => {
    api.get.mockRejectedValueOnce(new Error("fail"));
    renderWithAuth(true);
    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les événements/),
      ).toBeInTheDocument();
    });
  });

  it("shows 'Aucun événement' if empty list", async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    renderWithAuth(true);
    await waitFor(() => {
      expect(screen.getByText(/Aucun événement/)).toBeInTheDocument();
    });
  });

  it("renders loading if no permission", () => {
    renderWithAuth(false);
    expect(screen.getByText(/Aucun événement/)).toBeInTheDocument();
  });
});
