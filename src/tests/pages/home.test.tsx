import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/home.js";

describe("Home", () => {
  it("renders the welcome title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /Welcome to LocalCMM/i }),
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Your fast and efficient rental solution/i),
    ).toBeInTheDocument();
  });

  it("renders the access link to signin", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /Access the project/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signin");
  });
});
