import { describe, it, vi, expect, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HousingManagement from "../../../pages/housingManagement/housingManagement.js";
import { useLeaseActions } from "../../../hooks/housingManagement/useLeaseActions.js";

vi.mock("../../../hooks/housingManagement/useLeaseActions", () => ({
  useLeaseActions: vi.fn(),
}));


const mockLeases = [
  {
    LEAN_ID: 1,
    LEAD_START: "2025-01-01T00:00:00Z",
    LEAD_END: "2025-12-31T00:00:00Z",
    LEAN_RENT: "900",
    LEAN_CHARGES: "100",
    LEAD_PAYMENT: "2025-01-05T00:00:00Z",
    LEAB_ACTIVE: true,
    USEN_ID: 1,
    ACCN_ID: 1,
  },
];

const fetchLeases = vi.fn().mockResolvedValue(mockLeases);
const deleteLease = vi.fn().mockResolvedValue(true);

const mockUseLeaseActions = useLeaseActions as Mock;

beforeEach(() => {
  vi.clearAllMocks();
  mockUseLeaseActions.mockReturnValue({
    fetchLeases,
    deleteLease,
  });

  sessionStorage.setItem("userId", "1");
});


describe("HousingManagement", () => {
  it("renders the title and loads leases", async () => {
    render(<HousingManagement />);
    expect(screen.getByText(/gestion des baux/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchLeases).toHaveBeenCalled();
      expect(screen.getByText("900")).toBeInTheDocument(); 
    });
  });

  it("shows the form when clicking Ajouter", async () => {
    render(<HousingManagement />);

    await waitFor(() => {
      expect(fetchLeases).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText(/ajouter/i));
    expect(screen.getByRole("form", { name: /lease form/i })).toBeInTheDocument();
  });

  it("edits a lease when clicking Modifier", async () => {
    render(<HousingManagement />);
    await waitFor(() => expect(fetchLeases).toHaveBeenCalled());

    fireEvent.click(screen.getByText(/modifier/i));
    expect(screen.getByRole("form", { name: /lease form/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("900")).toBeInTheDocument(); 
  });

  it("deletes a lease and refreshes list", async () => {
    render(<HousingManagement />);
    await waitFor(() => expect(fetchLeases).toHaveBeenCalled());

    fireEvent.click(screen.getByText(/supprimer/i));

    await waitFor(() => {
      expect(deleteLease).toHaveBeenCalledWith(1);
      expect(fetchLeases).toHaveBeenCalledTimes(2); 
    });
  });

  it("closes the form and reloads leases", async () => {
    render(<HousingManagement />);
    await waitFor(() => expect(fetchLeases).toHaveBeenCalled());

    fireEvent.click(screen.getByText(/ajouter/i));
    const closeBtn = screen.getByRole("button", { name: /annuler/i });

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(fetchLeases).toHaveBeenCalledTimes(2); 
    });
  });
});
