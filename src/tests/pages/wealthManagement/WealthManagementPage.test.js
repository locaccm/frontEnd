import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import WealthManagementPage from "../../../pages/wealthManagement/WealthManagementPage.js";
const mockAccommodation = {
    ACCN_ID: 5,
    ACCC_NAME: "Nom test",
    ACCC_TYPE: "Type test",
    ACCC_ADDRESS: "Adresse test",
    ACCC_DESC: "Desc test",
    ACCB_AVAILABLE: true,
    USEN_ID: 1,
};
vi.mock("../../../components/wealthManagement/AccommodationTable", () => ({
    default: ({ onCreate, onEdit, onDelete, }) => (_jsxs("div", { "data-testid": "mock-table", children: [_jsx("button", { onClick: onCreate, children: "Mock Cr\u00E9er" }), _jsx("button", { onClick: () => onEdit(mockAccommodation), children: "Mock \u00C9diter" }), _jsx("button", { onClick: () => onDelete(42), children: "Mock Supprimer" })] })),
}));
vi.mock("../../../components/wealthManagement/CreateAccommodationModal", () => ({
    default: ({ onClose, onSuccess, }) => (_jsxs("div", { "data-testid": "mock-create-modal", children: [_jsx("span", { children: "Modal Cr\u00E9ation" }), _jsx("button", { onClick: onSuccess, children: "Valider Cr\u00E9ation" }), _jsx("button", { onClick: onClose, children: "Fermer Cr\u00E9ation" })] })),
}));
vi.mock("../../../components/wealthManagement/UpdateAccommodationModal", () => ({
    default: ({ onClose, onSuccess, }) => (_jsxs("div", { "data-testid": "mock-update-modal", children: [_jsx("span", { children: "Modal Update" }), _jsx("button", { onClick: onSuccess, children: "Valider Update" }), _jsx("button", { onClick: onClose, children: "Fermer Update" })] })),
}));
vi.mock("../../../components/wealthManagement/DeleteConfirmationModal", () => ({
    default: ({ onClose, onSuccess, }) => (_jsxs("div", { "data-testid": "mock-delete-modal", children: [_jsx("span", { children: "Modal Delete" }), _jsx("button", { onClick: onSuccess, children: "Valider Delete" }), _jsx("button", { onClick: onClose, children: "Fermer Delete" })] })),
}));
describe("WealthManagementPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = "";
    });
    it("affiche le titre et le tableau mocké", () => {
        render(_jsx(WealthManagementPage, {}));
        expect(screen.getByRole("heading", { name: /Gestion des logements/i })).toBeInTheDocument();
        expect(screen.getByText("Mock Créer")).toBeInTheDocument();
        expect(screen.getByText("Mock Éditer")).toBeInTheDocument();
        expect(screen.getByText("Mock Supprimer")).toBeInTheDocument();
    });
    it("ouvre la modale de création après clic sur 'Mock Créer'", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Créer"));
        expect(screen.getByTestId("mock-create-modal")).toBeInTheDocument();
    });
    it("ferme la modale de création après clic sur 'Fermer Création'", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Créer"));
        fireEvent.click(screen.getByText("Fermer Création"));
        expect(screen.getByText("Mock Créer")).toBeInTheDocument();
    });
    it("rafraîchit la table après validation de la création", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Créer"));
        fireEvent.click(screen.getByText("Valider Création"));
        expect(screen.getByTestId("mock-table")).toBeInTheDocument();
    });
    it("ouvre la modale de mise à jour après clic sur 'Mock Éditer'", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Éditer"));
        expect(screen.getByTestId("mock-update-modal")).toBeInTheDocument();
    });
    it("rafraîchit la table après validation de la mise à jour", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Éditer"));
        fireEvent.click(screen.getByText("Valider Update"));
        expect(screen.getByTestId("mock-table")).toBeInTheDocument();
    });
    it("ouvre la modale de suppression après clic sur 'Mock Supprimer'", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Supprimer"));
        expect(screen.getByTestId("mock-delete-modal")).toBeInTheDocument();
    });
    it("rafraîchit la table après validation de la suppression", () => {
        render(_jsx(WealthManagementPage, {}));
        fireEvent.click(screen.getByText("Mock Supprimer"));
        fireEvent.click(screen.getByText("Valider Delete"));
        expect(screen.getByTestId("mock-table")).toBeInTheDocument();
    });
});
