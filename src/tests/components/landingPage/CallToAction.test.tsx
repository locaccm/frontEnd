import React from "react";
import { render, screen } from "@testing-library/react";
import CallToAction from "../../../components/landingPage/CallToAction/CallToAction.js";

describe("CallToAction", () => {
  it("affiche le titre principal", () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/Optimisez la gestion de vos biens immobiliers/i),
    ).toBeInTheDocument();
  });

  it("affiche le texte de description", () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/Nos solutions innovantes et simples à utiliser/i),
    ).toBeInTheDocument();
  });

  it("affiche le sous-titre d'action", () => {
    render(<CallToAction />);
    expect(screen.getByText(/Commencez dès maintenant/i)).toBeInTheDocument();
  });

  it("affiche le bouton Créez votre compte", () => {
    render(<CallToAction />);
    expect(
      screen.getByRole("button", { name: /Créez votre compte/i }),
    ).toBeInTheDocument();
  });
});
