import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateAccommodationModal from "../../../components/wealthManagement/UpdateAccommodationModal.js";
import { vi } from "vitest";

const mockUpdateAccommodation = vi.fn();

vi.mock("../../../hooks/wealthManagement/useAccommodationActions", () => ({
  useAccommodationActions: () => ({
    updateAccommodation: mockUpdateAccommodation,
  }),
}));

describe("UpdateAccommodationModal", () => {
  const mockData = {
    ACCC_NAME: "Nom initial",
    ACCC_TYPE: "Type initial",
    ACCC_ADDRESS: "Adresse initiale",
    ACCC_DESC: "Description initiale",
    ACCB_AVAILABLE: true,
  };

  beforeEach(() => {
    mockUpdateAccommodation.mockReset();
  });

  it("display modal form with initial data value ", () => {
    render(
      <UpdateAccommodationModal
        onClose={() => {}}
        accommodationId={1}
        initialData={mockData}
      />,
    );

    expect(screen.getByDisplayValue("Nom initial")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Type initial")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Adresse initiale")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Description initiale"),
    ).toBeInTheDocument();
  });

  it("call updateAccommodation, onSuccess and onClose if success", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    mockUpdateAccommodation.mockResolvedValue(true);

    render(
      <UpdateAccommodationModal
        onClose={onClose}
        onSuccess={onSuccess}
        accommodationId={99}
        initialData={mockData}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: { value: "Nom modifié" },
    });

    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(mockUpdateAccommodation).toHaveBeenCalledWith(99, {
        ...mockData,
        ACCC_NAME: "Nom modifié",
      });
      expect(onSuccess).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("cancel the update and only call onClose", () => {
    const onClose = vi.fn();

    render(
      <UpdateAccommodationModal
        onClose={onClose}
        accommodationId={5}
        initialData={mockData}
      />,
    );

    fireEvent.click(screen.getByText("Annuler"));

    expect(onClose).toHaveBeenCalled();
    expect(mockUpdateAccommodation).not.toHaveBeenCalled();
  });
});
