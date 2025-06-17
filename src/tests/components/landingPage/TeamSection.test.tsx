import React from "react";
import { render, screen } from "@testing-library/react";
import TeamSection from "../../../components/landingPage/TeamSection/TeamSection.js";

// Mock all team member images (for Vitest)
vi.mock("../../../assets/images/landingPage/imgMatthieu.jpeg", () => ({
  default: "imgMatthieu.jpeg",
}));
vi.mock("../../../assets/images/landingPage/imgTom.jpeg", () => ({
  default: "imgTom.jpeg",
}));
vi.mock("../../../assets/images/landingPage/imgMosleh.jpeg", () => ({
  default: "imgMosleh.jpeg",
}));
vi.mock("../../../assets/images/landingPage/imgMaxime.jpeg", () => ({
  default: "imgMaxime.jpeg",
}));

// All other team member images use imgTom.jpeg or imgMaxime.jpeg, so the above mocks cover all cases.

describe("TeamSection component", () => {
  it("renders the team section title", () => {
    render(<TeamSection />);
    // Check if the main title is rendered
    expect(screen.getByText(/Notre Équipe/i)).toBeInTheDocument();
  });

  it("renders all team member names and roles", () => {
    render(<TeamSection />);
    // List of all team member names (unique)
    const names = [
      "Matthieu",
      "Tom DEHAME",
      "Axel",
      "Mosleh SNOUSSI",
      "Clement",
      "Leo",
      "Dylan",
      "Maxime",
      "Dynastie",
    ];
    // Check each member's name appears once
    names.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // List of roles (with possible duplicates)
    const roles = [
      { role: "Architect cloud", count: 1 },
      { role: "Product Owner", count: 1 },
      { role: "Scrum Master", count: 1 },
      { role: "Front-End", count: 2 }, // appears twice!
      { role: "DevOps", count: 2 }, // appears twice!
      { role: "Testeur et Assurance qualité", count: 2 }, // appears twice!
    ];
    // For each role, check the number of appearances
    roles.forEach(({ role, count }) => {
      expect(screen.getAllByText(role)).toHaveLength(count);
    });
  });

  it("renders all member images with the correct alt text", () => {
    render(<TeamSection />);
    // There should be one image per member, alt text matches their name
    const teamMembers = [
      "Matthieu",
      "Tom DEHAME",
      "Axel",
      "Mosleh SNOUSSI",
      "Clement",
      "Leo",
      "Dylan",
      "Maxime",
      "Dynastie",
    ];

    teamMembers.forEach((name) => {
      expect(screen.getByAltText(name)).toBeInTheDocument();
    });
  });

  it("renders exactly 9 team member cards", () => {
    render(<TeamSection />);
    // There should be 9 member cards (one per member)
    const cards = screen.getAllByRole("img"); // Each image is inside a card
    expect(cards.length).toBe(9);
  });
});
