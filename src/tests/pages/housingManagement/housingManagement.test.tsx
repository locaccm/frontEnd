import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HousingManagement from "../../../pages/housingManagement/housingManagement.js"; 
import { vi, beforeEach, describe, expect, Mock } from "vitest";
import '@testing-library/jest-dom';

global.fetch = vi.fn();

const mockLeases = [
  {
    LEAN_ID: 1,
    LEAD_START: "2024-01-01T00:00:00",
    LEAD_END: "2024-12-31T00:00:00",
    LEAN_RENT: "1000",
    LEAN_CHARGES: "200",
    LEAD_PAYMENT: "2024-01-05T00:00:00",
    LEAB_ACTIVE: true,
    USEN_ID: 1,
    ACCN_ID: 1,
  },
];

describe("HousingManagement", () => {
  beforeEach(() => {
    (fetch as ReturnType<typeof vi.fn>).mockClear(); 
  });

  test("displays leases after successful fetch", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockLeases,
    });

    render(<HousingManagement />);

    expect(await screen.findByText("1000")).toBeInTheDocument(); 
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Oui")).toBeInTheDocument();
  });

  test("displays an error message if fetch fails", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<HousingManagement />);

    expect(await screen.findByText("Erreur lors du chargement des baux")).toBeInTheDocument();
  });

  test("opens the form when 'Add' button is clicked", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<HousingManagement />);
    const addButton = await screen.findByText("Ajouter un bail");

    fireEvent.click(addButton);

    expect(screen.getByText("Ajouter un bail")).toBeInTheDocument();

  });

  test("deletes a lease when 'Delete' is clicked", async () => {
    (fetch as Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeases,
      })
      .mockResolvedValueOnce({ ok: true }) 
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [], 
      });

    render(<HousingManagement />);

    const deleteButton = await screen.findByText("Supprimer");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/lease/1"),
        expect.objectContaining({ method: "DELETE" })
      );
    });
  });
});