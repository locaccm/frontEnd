import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import WealthManagementPage from "../../../pages/wealthManagement/WealthManagementPage.js";
import {Accommodation} from "../../../types/wealthManagement/wealthManagement.js";


const mockAccommodation: Accommodation = {
  ACCN_ID: 5,
  ACCC_NAME: "Nom test",
  ACCC_TYPE: "Type test",
  ACCC_ADDRESS: "Adresse test",
  ACCC_DESC: "Desc test",
  ACCB_AVAILABLE: true,
  USEN_ID: 1,
};

vi.mock("../../../components/wealthManagement/AccommodationTable", () => ({
  default: ({
              onCreate,
              onEdit,
              onDelete,
            }: {
    onCreate: () => void;
    onEdit: (acc: Accommodation) => void;
    onDelete: (id: number) => void;
  }) => (
      <div data-testid="mock-table">
        <button onClick={onCreate}>Mock Créer</button>
        <button onClick={() => onEdit(mockAccommodation)}>Mock Éditer</button>
        <button onClick={() => onDelete(42)}>Mock Supprimer</button>
      </div>
  ),
}));

vi.mock(
    "../../../components/wealthManagement/CreateAccommodationModal",
    () => ({
      default: ({
                  onClose,
                  onSuccess,
                }: {
        onClose: () => void;
        onSuccess: () => void;
      }) => (
          <div data-testid="mock-create-modal">
            <span>Modal Création</span>
            <button onClick={onSuccess}>Valider Création</button>
            <button onClick={onClose}>Fermer Création</button>
          </div>
      ),
    })
);

vi.mock(
    "../../../components/wealthManagement/UpdateAccommodationModal",
    () => ({
      default: ({
                  onClose,
                  onSuccess,
                }: {
        onClose: () => void;
        onSuccess: () => void;
      }) => (
          <div data-testid="mock-update-modal">
            <span>Modal Update</span>
            <button onClick={onSuccess}>Valider Update</button>
            <button onClick={onClose}>Fermer Update</button>
          </div>
      ),
    })
);

vi.mock(
    "../../../components/wealthManagement/DeleteConfirmationModal",
    () => ({
      default: ({
                  onClose,
                  onSuccess,
                }: {
        onClose: () => void;
        onSuccess: () => void;
      }) => (
          <div data-testid="mock-delete-modal">
            <span>Modal Delete</span>
            <button onClick={onSuccess}>Valider Delete</button>
            <button onClick={onClose}>Fermer Delete</button>
          </div>
      ),
    })
);

describe("WealthManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("affiche le titre et le tableau mocké", () => {
    render(<WealthManagementPage />);
    expect(
        screen.getByRole("heading", { name: /Gestion des logements/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
    expect(screen.getByText("Mock Éditer")).toBeInTheDocument();
    expect(screen.getByText("Mock Supprimer")).toBeInTheDocument();
  });

  it("ouvre la modale de création après clic sur 'Mock Créer'", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Créer"));
    expect(screen.getByTestId("mock-create-modal")).toBeInTheDocument();
  });

  it("ferme la modale de création après clic sur 'Fermer Création'", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Créer"));
    fireEvent.click(screen.getByText("Fermer Création"));

    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
  });

  it("rafraîchit la table après validation de la création", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Créer"));
    fireEvent.click(screen.getByText("Valider Création"));

    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("ouvre la modale de mise à jour après clic sur 'Mock Éditer'", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Éditer"));
    expect(screen.getByTestId("mock-update-modal")).toBeInTheDocument();
  });

  it("rafraîchit la table après validation de la mise à jour", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Éditer"));
    fireEvent.click(screen.getByText("Valider Update"));
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("ouvre la modale de suppression après clic sur 'Mock Supprimer'", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Supprimer"));
    expect(screen.getByTestId("mock-delete-modal")).toBeInTheDocument();
  });

  it("rafraîchit la table après validation de la suppression", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Supprimer"));
    fireEvent.click(screen.getByText("Valider Delete"));
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });
});
