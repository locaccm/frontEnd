import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "../../../components/landingPage/HeroSection/HeroSection.js";

describe("HeroSection component", () => {
  it("renders the main heading", () => {
    render(<HeroSection />);
    // Check if the main headline is displayed
    expect(
      screen.getByText(
        /La gestion efficace des biens est la clé de la réussite immobilière/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders a section with class "hero-section"', () => {
    const { container } = render(<HeroSection />);
    // Check if the section has the correct class
    expect(container.querySelector("section.hero-section")).toBeInTheDocument();
  });
});
