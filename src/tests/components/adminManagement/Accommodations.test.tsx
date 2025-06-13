import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Accommodations from "../../../components/adminManagement/Accommodations.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module so we control all HTTP behavior in these tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake data for accommodations, used to populate the UI during tests
const fakeAccommodations = [
  {
    ACCN_ID: 1,
    ACCC_NAME: "Studio Centre",
    ACCC_TYPE: "Appartement",
    ACCC_ADDRESS: "10 rue de Lyon",
    ACCC_DESC: "Studio lumineux",
    ACCB_AVAILABLE: false,
    tenant: { USEC_LNAME: "Durand", USEC_FNAME: "Alice" },
    leases: [],
  },
  {
    ACCN_ID: 2,
    ACCC_NAME: "Maison Plage",
    ACCC_TYPE: "Maison",
    ACCC_ADDRESS: "123 avenue de la Mer",
    ACCC_DESC: "Vue sur mer",
    ACCB_AVAILABLE: true,
    tenant: null,
    leases: [],
  },
];

describe("Accommodations component", () => {
  beforeEach(() => {
    // Reset all mocks before every test

    // @ts-expect-error: mockResolvedValue is not in axios types but we need it for unit tests
    api.get.mockResolvedValue({ data: fakeAccommodations });

    // @ts-expect-error: mockResolvedValue for axios POST is only for tests
    api.post.mockResolvedValue({});

    // @ts-expect-error: mockResolvedValue for axios PUT is only for tests
    api.put.mockResolvedValue({});

    // @ts-expect-error: mockResolvedValue for axios DELETE is only for tests
    api.delete.mockResolvedValue({});
  });

  test("displays the list of accommodations", async () => {
    render(<Accommodations userId={5} />);
    // Check that both accommodation names are rendered
    expect(await screen.findByText("Studio Centre")).toBeInTheDocument();
    expect(screen.getByText("Maison Plage")).toBeInTheDocument();
    // Check that the current tenant is shown for an unavailable accommodation
    expect(screen.getByText(/Occupé par Alice Durand/)).toBeInTheDocument();
    // Check that 'Disponible' is rendered for available ones
    expect(screen.getByText(/Disponible/)).toBeInTheDocument();
  });

  test("creates a new accommodation", async () => {
    render(<Accommodations userId={7} />);
    // Fill in each required input field for a new accommodation
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: { value: "Appartement Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Type (Maison, Appartement...)"), {
      target: { value: "Loft" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "12 avenue des tests" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test description" },
    });
    // Click the create button
    fireEvent.click(screen.getByText("Créer"));
    // Assert that the API POST call was made with the correct data
    await waitFor(() =>
      // @ts-expect-error: jest mock for axios POST in test
      expect(api.post).toHaveBeenCalledWith(
        "/accommodations",
        expect.objectContaining({
          ACCC_NAME: "Appartement Test",
          ACCC_TYPE: "Loft",
          ACCC_ADDRESS: "12 avenue des tests",
          ACCC_DESC: "Test description",
        })
      )
    );
  });

  test("enables edit mode and saves changes", async () => {
    render(<Accommodations userId={4} />);
    // Wait for the accommodation to appear, then click "Modifier"
    expect(await screen.findByText("Studio Centre")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Modifier")[0]);
    // Change the accommodation name
    const nameInput = screen.getAllByDisplayValue("Studio Centre")[0];
    fireEvent.change(nameInput, { target: { value: "Studio Modifié" } });
    // Save the changes
    fireEvent.click(screen.getByText("Sauvegarder"));
    // Assert that the API PUT call was made with the updated data
    await waitFor(() =>
      // @ts-expect-error: jest mock for axios PUT in test
      expect(api.put).toHaveBeenCalledWith(
        "/accommodations/1",
        expect.objectContaining({
          ACCC_NAME: "Studio Modifié",
          ACCC_TYPE: "Appartement",
          ACCC_ADDRESS: "10 rue de Lyon",
          ACCC_DESC: "Studio lumineux",
        })
      )
    );
  });

  test("deletes an accommodation", async () => {
    render(<Accommodations userId={8} />);
    // Wait for the accommodation to appear, then click the delete button
    expect(await screen.findByText("Studio Centre")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Supprimé")[0]);
    // Assert that the API DELETE call was made with the correct id
    await waitFor(() =>
      // @ts-expect-error: jest mock for axios DELETE in test
      expect(api.delete).toHaveBeenCalledWith("/accommodations/1")
    );
  });
});
