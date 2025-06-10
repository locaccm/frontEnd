import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LeaseForm from "../../../components/housingManagement/LeaseForm.js";
import { Lease } from "../../../pages/housingManagement/housingManagement.js";
import { useLeaseActions } from "../../../hooks/housingManagement/useLeaseActions.js";

vi.mock("../../../hooks/housingManagement/useLeaseActions", () => ({
  useLeaseActions: vi.fn(),
}));
const mockCreateLease = vi.fn();
const mockUpdateLease = vi.fn();

const mockUseLeaseActions = useLeaseActions as unknown as jest.Mock;

beforeEach(() => {
  vi.clearAllMocks();
  mockUseLeaseActions.mockReturnValue({
    createLease: mockCreateLease,
    updateLease: mockUpdateLease,
  });

  sessionStorage.setItem("userId", "1");
});
const mockLease: Lease = {
  LEAN_ID: 1,
  LEAD_START: "2025-01-01T00:00:00.000Z",
  LEAD_END: "2025-12-31T00:00:00.000Z",
  LEAN_RENT: "1000",
  LEAN_CHARGES: "200",
  LEAD_PAYMENT: "2025-01-05T00:00:00.000Z",
  LEAB_ACTIVE: true,
  USEN_ID: 1,
  ACCN_ID: 1,
};

describe("LeaseForm", () => {
  it("renders empty form when lease is null", () => {
    render(<LeaseForm lease={null} onClose={() => {}} />);
    expect(screen.getByText(/ajouter un nouveau bail/i)).toBeInTheDocument();
  });

  it("renders filled form when lease is provided", () => {
    render(<LeaseForm lease={mockLease} onClose={() => {}} />);
    expect(screen.getByDisplayValue("2025-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
  });

  it("submits createLease on submit when no lease", async () => {
    mockCreateLease.mockResolvedValue(true);

    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/date de début/i), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText(/date de fin/i), { target: { value: "2025-12-31" } });
    fireEvent.change(screen.getByLabelText(/loyer/i), { target: { value: "850" } });
    fireEvent.change(screen.getByLabelText(/charges/i), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText(/date de paiement/i), { target: { value: "2025-01-05" } });
    fireEvent.change(screen.getByLabelText(/id utilisateur/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/id logement/i), { target: { value: 2 } });

    fireEvent.click(screen.getByRole("button", { name: /créer/i }));

    await Promise.resolve(); 
  expect(mockCreateLease).toHaveBeenCalledWith({
    LEAD_START: "2025-01-01",
    LEAD_END: "2025-12-31",
    LEAN_RENT: 850,
    LEAN_CHARGES: 150,
    LEAD_PAYMENT: "2025-01-05",
    LEAB_ACTIVE: true,
    ACCN_ID: "2",
  });


    expect(onClose).toHaveBeenCalled();
  });

  it("submits updateLease when lease is provided", async () => {
    mockUpdateLease.mockResolvedValue(true);
    const onClose = vi.fn();

    render(<LeaseForm lease={mockLease} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /enregistrer les modifications/i }));

    await Promise.resolve(); 

    expect(mockUpdateLease).toHaveBeenCalledWith(mockLease.LEAN_ID, {
      LEAD_START: "2025-01-01",
      LEAD_END: "2025-12-31",
      LEAN_RENT: 1000,
      LEAN_CHARGES: 200,
      LEAD_PAYMENT: "2025-01-05",
      LEAB_ACTIVE: true,
      ACCN_ID: 1,
      USEN_ID: 1,
    });

    expect(onClose).toHaveBeenCalled();
  });

  it("click on Annuler calls onClose", () => {
    const onClose = vi.fn();
    render(<LeaseForm lease={null} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /annuler/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
