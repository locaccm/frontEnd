import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../../../pages/authentication/Signup/Signup.js";

describe("<Signup />", () => {
  it("rend correctement la page d'inscription avec ses éléments", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Bienvenue\sde retour/i)).toBeInTheDocument();

    expect(screen.getByText("Se connecter")).toBeInTheDocument();
  });
});
