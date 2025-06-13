import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Events from "../../../components/adminManagement/Events.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module (adminApi) so we control network behavior in all tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake data for events used in tests
const fakeEvents = [
  {
    EVEN_ID: 1,
    EVEC_LIB: "Réunion équipe",
    EVED_START: "2024-06-13T09:00:00.000Z",
    EVED_END: "2024-06-13T10:00:00.000Z",
    USEN_ID: 5,
  },
  {
    EVEN_ID: 2,
    EVEC_LIB: "Entretien",
    EVED_START: "2024-06-14T11:00:00.000Z",
    EVED_END: "2024-06-14T12:00:00.000Z",
    USEN_ID: 5,
  },
];

describe("Events component", () => {
  beforeEach(() => {
    // Reset all API mocks before every test

    // @ts-expect-error: mockResolvedValue is not typed on axios mock in unit tests
    api.get.mockResolvedValue({ data: fakeEvents });

    // @ts-expect-error: mockResolvedValue is not in axios types for POST (unit test only)
    api.post.mockResolvedValue({});

    // @ts-expect-error: mockResolvedValue is not in axios types for PUT (unit test only)
    api.put.mockResolvedValue({});

    // @ts-expect-error: mockResolvedValue is not in axios types for DELETE (unit test only)
    api.delete.mockResolvedValue({});
  });

  test("displays the list of events", async () => {
    render(<Events userId={5} />);
    // Should show both event names
    expect(await screen.findByText("Réunion équipe")).toBeInTheDocument();
    expect(screen.getByText("Entretien")).toBeInTheDocument();
    // Should show formatted event dates (adapt regex if you change display)
    expect(screen.getByText(/du 13\/06\/2024 au 13\/06\/2024/)).toBeInTheDocument();
    expect(screen.getByText(/du 14\/06\/2024 au 14\/06\/2024/)).toBeInTheDocument();
  });

  test("creates a new event", async () => {
    render(<Events userId={7} />);
    // Fill the label input
    fireEvent.change(screen.getByPlaceholderText("Libellé"), {
      target: { value: "Nouvel événement" },
    });
    // Select all empty value inputs (should be two date inputs)
    const dateInputs = screen.getAllByDisplayValue("");
    fireEvent.change(dateInputs[0], { target: { value: "2024-07-01" } }); // Start date
    fireEvent.change(dateInputs[1], { target: { value: "2024-07-03" } }); // End date

    // Click the create button
    fireEvent.click(screen.getByText("Créer"));

    // Wait for the API POST call with correct payload
    await waitFor(() =>
      // @ts-expect-error: POST is a mock and not typed as axios in test
      expect(api.post).toHaveBeenCalledWith(
        "/events",
        expect.objectContaining({
          EVEC_LIB: "Nouvel événement",
          USEN_ID: 7,
          EVED_START: "2024-07-01",
          EVED_END: "2024-07-03",
        })
      )
    );
  });

  test("edits an event", async () => {
    // Mock the window.prompt dialog for the label change
    window.prompt = vi.fn().mockReturnValue("Libellé modifié");
    render(<Events userId={2} />);
    // Wait for first event to appear, then trigger edit
    expect(await screen.findByText("Réunion équipe")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Modifier")[0]);
    // Wait for the PUT call with updated label
    await waitFor(() =>
      // @ts-expect-error: PUT is a mock and not typed as axios in test
      expect(api.put).toHaveBeenCalledWith(
        "/events/1",
        expect.objectContaining({ EVEC_LIB: "Libellé modifié" })
      )
    );
  });

  test("deletes an event", async () => {
    render(<Events userId={4} />);
    // Wait for event, then click the delete button
    expect(await screen.findByText("Réunion équipe")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Supprimé")[0]);
    // Wait for the DELETE API call
    await waitFor(() =>
      // @ts-expect-error: DELETE is a mock and not typed as axios in test
      expect(api.delete).toHaveBeenCalledWith("/events/1")
    );
  });
});
