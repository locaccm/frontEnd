import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Messages from "../../../components/adminManagement/Messages.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module to control network responses in all tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake messages to populate the component for testing
const fakeMessages = [
  {
    MESN_ID: 1,
    MESC_CONTENT: "Hello Zakaria!",
    MESD_DATE: "2024-06-13T13:45:00.000Z",
    MESB_NEW: true,
    receiver: { USEC_FNAME: "Sarah", USEC_LNAME: "Martin" },
  },
  {
    MESN_ID: 2,
    MESC_CONTENT: "Rendez-vous confirmé.",
    MESD_DATE: "2024-06-12T09:30:00.000Z",
    MESB_NEW: false,
    receiver: { USEC_FNAME: "Yassine", USEC_LNAME: "El Amrani" },
  },
];

describe("Messages component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error: mockResolvedValue is not typed in axios mocks for tests
    api.get.mockResolvedValue({ data: fakeMessages });
    // @ts-expect-error: mockResolvedValue is used in test mocks, not typed by default
    api.put.mockResolvedValue({});
    // @ts-expect-error: mockResolvedValue is used for axios delete in test mocks
    api.delete.mockResolvedValue({});
  });

  test("displays the list of messages", async () => {
    render(<Messages userId={10} />);
    // Check that both messages appear in the UI
    expect(await screen.findByText("Hello Zakaria!")).toBeInTheDocument();
    expect(screen.getByText("Rendez-vous confirmé.")).toBeInTheDocument();
    // Should show both receivers
    expect(screen.getByText(/Envoyé à Sarah Martin/)).toBeInTheDocument();
    expect(screen.getByText(/Envoyé à Yassine El Amrani/)).toBeInTheDocument();
    // Check for "Lu" label on read messages
    expect(screen.getByText(/— Lu/)).toBeInTheDocument();
    // The unread message should have "Marquer comme lu" button
    expect(screen.getByText("Marquer comme lu")).toBeInTheDocument();
  });

  test("marks a message as read", async () => {
    render(<Messages userId={11} />);
    expect(await screen.findByText("Hello Zakaria!")).toBeInTheDocument();
    // Click the "Marquer comme lu" button
    fireEvent.click(screen.getByText("Marquer comme lu"));
    await waitFor(() =>
      // @ts-expect-error: mock put method for test is not typed in axios
      expect(api.put).toHaveBeenCalledWith("/messages/1/read")
    );
  });

  test("deletes a message", async () => {
    render(<Messages userId={12} />);
    expect(await screen.findByText("Hello Zakaria!")).toBeInTheDocument();
    // Click the first "Supprimé" button (for the first message)
    fireEvent.click(screen.getAllByText("Supprimé")[0]);
    await waitFor(() =>
      // @ts-expect-error: mock delete method for test is not typed in axios
      expect(api.delete).toHaveBeenCalledWith("/messages/1")
    );
  });
});
