import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateAccommodationModal from "../../../components/wealthManagement/CreateAccommodationModal.js";
import { vi } from "vitest";

const mockCreateAccommodation = vi.fn();

vi.mock("../../../hooks/wealthManagement/useAccommodationActions", () => ({
  useAccommodationActions: () => ({
    createAccommodation: mockCreateAccommodation,
  }),
}));

describe("CreateAccommodationModal", () => {
  beforeEach(() => {
    mockCreateAccommodation.mockReset();
  });

  it("display the modal form and call onSucess then onClose when Submit", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    mockCreateAccommodation.mockResolvedValue(true);

    render(<CreateAccommodationModal onClose={onClose} onSuccess={onSuccess} />);

    expect(screen.getByText("Créer un logement")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Nom"), { target: { value: "Test Logement" } });
    fireEvent.change(screen.getByPlaceholderText("Type"), { target: { value: "Appartement" } });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), { target: { value: "42 rue du test" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Vue mer" } });

    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(mockCreateAccommodation).toHaveBeenCalledWith({
        ACCC_NAME: "Test Logement",
        ACCC_TYPE: "Appartement",
        ACCC_ADDRESS: "42 rue du test",
        ACCC_DESC: "Vue mer",
        ACCB_AVAILABLE: true,
      });
      expect(onSuccess).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("cancel the creation on click on cancel", () => {
    const onClose = vi.fn();

    render(<CreateAccommodationModal onClose={onClose} />);

    fireEvent.click(screen.getByText("Annuler"));

    expect(onClose).toHaveBeenCalled();
  });
});
