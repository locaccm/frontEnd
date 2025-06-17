import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeaseForm from "../../../components/housingManagement/LeaseForm.js";
import { Lease } from "../../../pages/housingManagement/housingManagement.js";
import { useAccommodationActions } from "../../../hooks/wealthManagement/useAccommodationActions.js";

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
    sessionStorage.setItem("token", "fake-token");
    sessionStorage.setItem("userId", "4"); 
  });

  it("renders correctly in create mode", () => {
    render(<LeaseForm lease={null} onClose={vi.fn()} />);

    expect(screen.getByText("Ajouter un nouveau bail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Créer/i })).toBeInTheDocument();
  });

  it("pre-fills form when lease is provided", () => {
    render(<LeaseForm lease={mockLease} onClose={vi.fn()} />);

    expect(screen.getByDisplayValue("800")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024-01-01")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("2025-01-01")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("2024-01-15")).toBeInTheDocument(); 
  });

  it("sends POST request when lease is null", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    const onClose = vi.fn();
  
    render(<LeaseForm lease={null} onClose={onClose} />);
  
    fireEvent.change(screen.getByLabelText(/Date de début/i), { target: { value: "2024-01-01" } });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText(/Loyer/i), { target: { value: "750" } });
    fireEvent.change(screen.getByLabelText(/Charges/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/Date de paiement/i), { target: { value: "2024-01-15" } });
    expect(screen.getByLabelText(/Nom du locataire/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Logement/i), { target: { value: "2" } });
  
    const form = screen.getByRole("dialog").querySelector("form")!;
    fireEvent.submit(form);
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/lease"),
        expect.objectContaining({ method: "POST" })
      );
      expect(onClose).toHaveBeenCalled();
    });
  });  

  it("sends PUT request when lease is provided", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    const onClose = vi.fn();
  
    render(<LeaseForm lease={mockLease} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/Loyer/i), {
      target: { value: "850" },
    });
  
    const form = screen.getByRole("dialog").querySelector("form")!;
    fireEvent.submit(form);
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/lease/${mockLease.LEAN_ID}`),
        expect.objectContaining({ method: "PUT" })
      );
      expect(onClose).toHaveBeenCalled();
    });
  });  

  it("closes the form when clicking on Annuler", () => {
    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: /Annuler/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("shows an error when fetch fails", async () => {
    const errorMessage = "Erreur serveur";
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve(errorMessage),
    });

    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/Date de début/i), { target: { value: "2024-01-01" } });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText(/Loyer/i), { target: { value: "800" } });
    fireEvent.change(screen.getByLabelText(/Charges/i), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText(/Date de paiement/i), { target: { value: "2024-01-15" } });
    expect(screen.getByLabelText(/Nom du locataire/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Logement/i), { target: { value: "2" } });

    const form = screen.getByRole("dialog").querySelector("form")!;
    fireEvent.submit(form);

    expect(global.fetch).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("logs error and prevents submit when no token in sessionStorage", async () => {
    sessionStorage.removeItem("token");
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<LeaseForm lease={null} onClose={vi.fn()} />);

    const form = screen.getByRole("dialog").querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Aucun token d'authentification trouvé.");
    });

    consoleErrorSpy.mockRestore();
  });

  it("logs error when fetch throws an exception", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    render(<LeaseForm lease={null} onClose={vi.fn()} />);

    const form = screen.getByRole("dialog").querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Échec de l'envoi du formulaire :",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("sets accommodations and housing name from fetched data", async () => {
    const accommodationsMock = [
      { ACCN_ID: 1, ACCC_NAME: "Test Logement" },
      { ACCN_ID: 2, ACCC_NAME: "Autre Logement" },
    ];

    render(<LeaseForm lease={null} onClose={vi.fn()} />);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Test Logement" })).toBeInTheDocument();
    });
    expect(screen.getByTestId("housing-name")).toHaveTextContent("Test Logement");
  });

});