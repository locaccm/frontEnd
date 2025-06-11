import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../../../pages/authentication/Signup/Signup.js";
describe("<Signup />", () => {
    it("correctly renders the registration page with its elements", () => {
        render(_jsx(MemoryRouter, { children: _jsx(Signup, {}) }));
        expect(screen.getByText(/Bienvenue\sde retour/i)).toBeInTheDocument();
        expect(screen.getByText("Se connecter")).toBeInTheDocument();
    });
});
