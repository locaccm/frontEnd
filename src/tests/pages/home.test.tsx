import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/home.js";

describe("Home", () => {
  it("renders the welcome title", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Welcome to LocalCMM/i }),
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<Home />);
    expect(
      screen.getByText(/Your fast and efficient rental solution/i),
    ).toBeInTheDocument();
  });

  it("renders the access link", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Access the project/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "http://localhost:5173/signin");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
