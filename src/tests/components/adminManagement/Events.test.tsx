import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor, within } from "@testing-library/dom";
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
    api.get.mockResolvedValue({ data: fakeEvents });
    api.post.mockResolvedValue({});
    api.put.mockResolvedValue({});
    api.delete.mockResolvedValue({});
  });

  test("displays the list of events", async () => {
    render(<Events userId={5} />);
    // Wait for list items
    const eventItems = await screen.findAllByRole("listitem");
    // Vérifie le premier event
    expect(within(eventItems[0]).getByText("Réunion équipe")).toBeInTheDocument();
    expect(eventItems[0].textContent).toContain("du 13/06/2024 au 13/06/2024");
    // Vérifie le deuxième event
    expect(within(eventItems[1]).getByText("Entretien")).toBeInTheDocument();
    expect(eventItems[1].textContent).toContain("du 14/06/2024 au 14/06/2024");
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
      expect(api.put).toHaveBeenCalledWith(
        "/events/1",
        expect.objectContaining({ EVEC_LIB: "Libellé modifié" })
      )
    );
  });

  test("deletes an event", async () => {
    render(<Events userId={4} />);
    expect(await screen.findByText("Réunion équipe")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Supprimé")[0]);
    await waitFor(() =>
      expect(api.delete).toHaveBeenCalledWith("/events/1")
    );
  });
});
