import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "../../../pages/authentication/Signin/Signin.js";
describe("<Signin />", () => {
    it("render correctement les éléments de la page de connexion", () => {
        render(_jsx(MemoryRouter, { children: _jsx(Signin, {}) }));
        expect(screen.getByText("S'inscrire")).toBeInTheDocument();
        expect(screen.getByText("Nouveau ici ?")).toBeInTheDocument();
    });
});
