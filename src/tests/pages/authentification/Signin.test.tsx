import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "../../../pages/authentication/Signin/Signin.js";

describe("<Signin />", () => {
  it("render correctement les éléments de la page de connexion", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>,
    );

    expect(screen.getByText("S'inscrire")).toBeInTheDocument();

    expect(screen.getByText("Nouveau ici ?")).toBeInTheDocument();
  });
});
