import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LeaseForm from "../../../components/housingManagement/LeaseForm.js";
import { Lease } from "../../../pages/housingManagement/housingManagement.js";
import React from "react";

const mockLease: Lease = {
  LEAN_ID: 1,
  LEAD_START: "2024-01-01T00:00:00Z",
  LEAD_END: "2025-01-01T00:00:00Z",
  LEAN_RENT: "800",
  LEAN_CHARGES: "100",
  LEAD_PAYMENT: "2024-01-15T00:00:00Z",
  LEAB_ACTIVE: true,
  USEN_ID: 2,
  ACCN_ID: 3,
};

describe("LeaseForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("displays fields correctly in create mode", () => {
    render(<LeaseForm lease={null} onClose={vi.fn()} />);

    expect(screen.getByText("Ajouter un nouveau bail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Créer/i })).toBeInTheDocument();
  });

  it("fills in the form with the data entered via lease", () => {
    render(<LeaseForm lease={mockLease} onClose={vi.fn()} />);

    expect(screen.getByDisplayValue("800")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024-01-01")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("2025-01-01")).toBeInTheDocument(); 
  });

  it("POSTs the form if lease is null", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as any;
    const onClose = vi.fn();

    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/Date de début/i), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/Loyer/i), {
      target: { value: "750" },
    });
    fireEvent.change(screen.getByLabelText(/Charges/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Date de paiement/i), {
      target: { value: "2024-01-15" },
    });
    fireEvent.change(screen.getByLabelText(/ID Utilisateur/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/ID Logement/i), {
      target: { value: "5" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(await screen.findByText(/Créer/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/lease"), expect.objectContaining({ method: "POST" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("close the form by clicking on Cancel", () => {
    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: /Annuler/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("displays an error if fetch fails", async () => {
    const errorMessage = "Servor error";
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve(errorMessage),
    }) as any;

    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/Date de début/i), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/Loyer/i), {
      target: { value: "800" },
    });
    fireEvent.change(screen.getByLabelText(/Charges/i), {
      target: { value: "80" },
    });
    fireEvent.change(screen.getByLabelText(/Date de paiement/i), {
      target: { value: "2024-01-15" },
    });
    fireEvent.change(screen.getByLabelText(/ID Utilisateur/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/ID Logement/i), {
      target: { value: "2" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(global.fetch).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
