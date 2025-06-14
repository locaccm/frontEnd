// src/tests/components/dashbordManagement/Messages.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import Messages from "../../../components/dashboardManagement/Messages.js";
import { AuthContext } from "../../../core/api/dashbordManagement/AuthContext.js";

// Mock the API module used inside the component
vi.mock("../../../core/api/dashbordManagement/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));
import api from "../../../core/api/dashbordManagement/api.js";

/**
 * Helper to render the component with a custom AuthContext value.
 * @param hasPermission Simulate permission for the user.
 * @param userId ID of the user.
 */
function renderWithAuth(hasPermission = true, userId = 1) {
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
      <Messages userId={userId} />
    </AuthContext.Provider>
  );
}

describe("Messages component", () => {
  // Example messages for mocking API response
  const mockMessages = [
    {
      id: 1,
      from: "Alice",
      to: "Bob",
      content: "Hello Bob!",
      date: "2024-06-13T18:45:00.000Z",
    },
    {
      id: 2,
      from: "Charlie",
      to: "Alice",
      content: "Hey Alice, how are you?",
      date: "2024-06-13T19:00:00.000Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: Should render messages if permission is granted and API returns data.
   */
  it("renders messages when permission is granted and API returns data", async () => {
    // 👇 Type-safe mock for mockResolvedValueOnce
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockResolvedValueOnce({ data: mockMessages });
    renderWithAuth(true, 1);

    // Should show loading/title first
    expect(screen.getByText(/Mes messages/i)).toBeInTheDocument();

    // Wait for the mocked messages to appear
    await waitFor(() => {
      expect(screen.getAllByText(/Alice/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Bob/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Hello Bob!/)).toBeInTheDocument();
      expect(screen.getByText(/Hey Alice, how are you?/)).toBeInTheDocument();
    });
  });

  /**
   * Test: Should show error if API call fails.
   */
  it("renders an error message if the API call fails", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockRejectedValueOnce(new Error("fail"));
    renderWithAuth(true, 1);

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les messages/)
      ).toBeInTheDocument();
    });
  });

  /**
   * Test: Should display 'Aucun message' if permission but no messages.
   */
  it("renders 'Aucun message' when permission is granted but no messages", async () => {
    const mockedApiGet = api.get as unknown as ReturnType<typeof vi.fn>;
    mockedApiGet.mockResolvedValueOnce({ data: [] });
    renderWithAuth(true, 1);

    await waitFor(() => {
      expect(screen.getByText(/Aucun message/i)).toBeInTheDocument();
    });
  });

  /**
   * Test: Should render title and empty message if no permission (no fetch).
   */
  it("renders nothing but title if no permission", () => {
    renderWithAuth(false, 1);
    expect(screen.getByText(/Mes messages/i)).toBeInTheDocument();
    expect(screen.getByText(/Aucun message/i)).toBeInTheDocument();
  });
});
