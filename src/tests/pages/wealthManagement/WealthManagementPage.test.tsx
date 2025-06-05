import { render, screen, fireEvent } from "@testing-library/react";
import WealthManagementPage from "../../../pages/wealthManagement/WealthManagementPage.js";
import React from "react";
import { vi } from "vitest";
import type { Accommodation } from "../../../types/wealthManagement/wealthManagement.js";

interface TableProps {
  onCreate: () => void;
  onEdit: (acc: Accommodation) => void;
  onDelete: (id: number) => void;
}

interface ModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

vi.mock("../../../components/wealthManagement/AccommodationTable", () => ({
  default: ({ onCreate, onEdit, onDelete }: TableProps) => (
    <div>
      <button onClick={onCreate}>Mock Créer</button>
      <button onClick={() => onEdit(mockAccommodation)}>Mock Éditer</button>
      <button onClick={() => onDelete(42)}>Mock Supprimer</button>
    </div>
  ),
}));

vi.mock("../../../components/wealthManagement/CreateAccommodationModal", () => ({
  default: ({ onClose, onSuccess }: ModalProps) => (
    <div>
      <span>Modal Création</span>
      <button onClick={onSuccess}>Valider Création</button>
      <button onClick={onClose}>Fermer Création</button>
    </div>
  ),
}));

vi.mock("../../../components/wealthManagement/UpdateAccommodationModal", () => ({
  default: ({ onClose, onSuccess }: ModalProps) => (
    <div>
      <span>Modal Update</span>
      <button onClick={onSuccess}>Valider Update</button>
      <button onClick={onClose}>Fermer Update</button>
    </div>
  ),
}));

vi.mock("../../../components/wealthManagement/DeleteConfirmationModal", () => ({
  default: ({ onClose, onSuccess }: ModalProps) => (
    <div>
      <span>Modal Delete</span>
      <button onClick={onSuccess}>Valider Delete</button>
      <button onClick={onClose}>Fermer Delete</button>
    </div>
  ),
}));

const mockAccommodation = {
  ACCN_ID: 5,
  ACCC_NAME: "Nom test",
  ACCC_TYPE: "Type test",
  ACCC_ADDRESS: "Adresse test",
  ACCC_DESC: "Desc test",
  ACCB_AVAILABLE: true,
  USEN_ID: 1,
};

describe("WealthManagementPage", () => {
  it("display board", () => {
    render(<WealthManagementPage />);
    expect(screen.getByText("Gestion des logements")).toBeInTheDocument();
    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
  });

  it("open create modal", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Créer"));
    expect(screen.getByText("Modal Création")).toBeInTheDocument();
  });

  it("open update modal", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Éditer"));
    expect(screen.getByText("Modal Update")).toBeInTheDocument();
  });

  it("open delete modal", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Supprimer"));
    expect(screen.getByText("Modal Delete")).toBeInTheDocument();
  });

  it("refresh table after create success", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Créer"));
    fireEvent.click(screen.getByText("Valider Création"));
    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
  });

  it("refresh table after update success", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Éditer"));
    fireEvent.click(screen.getByText("Valider Update"));
    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
  });

  it("refresh table after delete success", () => {
    render(<WealthManagementPage />);
    fireEvent.click(screen.getByText("Mock Supprimer"));
    fireEvent.click(screen.getByText("Valider Delete"));
    expect(screen.getByText("Mock Créer")).toBeInTheDocument();
  });
});
