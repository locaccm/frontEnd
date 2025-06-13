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

// Helper to render the component with a custom AuthContext value
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
    </AuthContext.Provider>,
  );
}

describe("Messages component", () => {
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

  it("renders messages when permission is granted and API returns data", async () => {
    api.get.mockResolvedValueOnce({ data: mockMessages });
    renderWithAuth(true, 1);

    // Shows loading first
    expect(screen.getByText(/Mes messages/i)).toBeInTheDocument();

    // Wait for messages to appear
    await waitFor(() => {
      expect(screen.getAllByText(/Alice/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Bob/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Hello Bob!/)).toBeInTheDocument();
      expect(screen.getByText(/Hey Alice, how are you?/)).toBeInTheDocument();
    });
  });

  it("renders an error message if the API call fails", async () => {
    api.get.mockRejectedValueOnce(new Error("fail"));
    renderWithAuth(true, 1);

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les messages/),
      ).toBeInTheDocument();
    });
  });

  it("renders 'Aucun message' when permission is granted but no messages", async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    renderWithAuth(true, 1);

    await waitFor(() => {
      expect(screen.getByText(/Aucun message/i)).toBeInTheDocument();
    });
  });

  it("renders nothing but title if no permission", () => {
    renderWithAuth(false, 1);
    // The effect won't fetch, so only the title and empty list appear
    expect(screen.getByText(/Mes messages/i)).toBeInTheDocument();
    // There should be "Aucun message" because the messages array is empty by default
    expect(screen.getByText(/Aucun message/i)).toBeInTheDocument();
  });
});
