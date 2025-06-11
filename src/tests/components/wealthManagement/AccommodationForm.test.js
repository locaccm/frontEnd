import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AccommodationForm from "../../../components/wealthManagement/AccommodationForm.js";
describe("AccommodationForm", () => {
    const initialData = {
        ACCC_NAME: "Appartement",
        ACCC_TYPE: "Studio",
        ACCC_ADDRESS: "123 Rue Principale",
        ACCC_DESC: "Proche du centre",
        ACCB_AVAILABLE: true,
    };
    it("display fields with initial values", () => {
        render(_jsx(AccommodationForm, { initialData: initialData, onSubmit: vi.fn(), onCancel: vi.fn() }));
        expect(screen.getByPlaceholderText("Nom")).toHaveValue("Appartement");
        expect(screen.getByPlaceholderText("Type")).toHaveValue("Studio");
        expect(screen.getByPlaceholderText("Adresse")).toHaveValue("123 Rue Principale");
        expect(screen.getByPlaceholderText("Description")).toHaveValue("Proche du centre");
        expect(screen.getByLabelText("Disponible :")).toBeChecked();
    });
    it("Update a field and submit the right data", () => {
        const onSubmit = vi.fn();
        render(_jsx(AccommodationForm, { initialData: initialData, onSubmit: onSubmit, onCancel: vi.fn() }));
        const nameInput = screen.getByPlaceholderText("Nom");
        fireEvent.change(nameInput, { target: { value: "Maison" } });
        const submitButton = screen.getByText("Valider");
        fireEvent.click(submitButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            ...initialData,
            ACCC_NAME: "Maison",
        });
    });
    it("cancel update with button 'Annuler'", () => {
        const onCancel = vi.fn();
        render(_jsx(AccommodationForm, { initialData: initialData, onSubmit: vi.fn(), onCancel: onCancel }));
        const cancelButton = screen.getByText("Annuler");
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
