import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteConfirmationModal from "../../../components/wealthManagement/DeleteConfirmationModal.js";
import { vi } from "vitest";

const mockDeleteAccommodation = vi.fn();

vi.mock("../../../hooks/wealthManagement/useAccommodationActions", () => ({
  useAccommodationActions: () => ({
    deleteAccommodation: mockDeleteAccommodation,
  }),
}));

describe("DeleteConfirmationModal", () => {
  beforeEach(() => {
    mockDeleteAccommodation.mockReset();
  });

  it("Dont display if isOpen false", () => {
    const { container } = render(
      <DeleteConfirmationModal
        isOpen={false}
        onClose={() => {}}
        accommodationId={1}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("display if isOpen true", () => {
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={() => {}}
        accommodationId={1}
      />,
    );
    expect(screen.getByText("Confirmer la suppression")).toBeInTheDocument();
    expect(
      screen.getByText("Êtes-vous sûr de vouloir supprimer ce logement ?"),
    ).toBeInTheDocument();
  });

  it("call deleteAccommodation, onSuccess and onClose if delete is sucessful", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    mockDeleteAccommodation.mockResolvedValue(true);

    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={onClose}
        accommodationId={42}
        onSuccess={onSuccess}
      />,
    );

    fireEvent.click(screen.getByText("Oui, supprimer"));

    await waitFor(() => {
      expect(mockDeleteAccommodation).toHaveBeenCalledWith(42);
      expect(onSuccess).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("call only onClose if Annuler button is click", () => {
    const onClose = vi.fn();

    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={onClose}
        accommodationId={99}
      />,
    );

    fireEvent.click(screen.getByText("Annuler"));
    expect(onClose).toHaveBeenCalled();
    expect(mockDeleteAccommodation).not.toHaveBeenCalled();
  });
});
