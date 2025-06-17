import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutesContent from "../../components/routes/appRoutesContent.js";

// Mock the landing page component
vi.mock("../../pages/landingPage/LandingPage.js", () => ({
  default: () => <div>Landing Page</div>,
}));

// Mock Signin page
vi.mock("../../pages/authentication/Signin/Signin.js", () => ({
  default: () => <div>Signin Page</div>,
}));

// Mock Signup page
vi.mock("../../pages/authentication/Signup/Signup.js", () => ({
  default: () => <div>Signup Page</div>,
}));

// You can mock other pages similarly if needed

describe("AppRoutesContent", () => {
  it("renders the Home page at '/' route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutesContent />
      </MemoryRouter>,
    );

    expect(screen.getByText("Landing Page")).toBeInTheDocument();
  });

  it("renders the Signin page at '/signin' route", () => {
    render(
      <MemoryRouter initialEntries={["/signin"]}>
        <AppRoutesContent />
      </MemoryRouter>,
    );

    expect(screen.getByText("Signin Page")).toBeInTheDocument();
  });

  it("renders the Signup page at '/signup' route", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <AppRoutesContent />
      </MemoryRouter>,
    );

    expect(screen.getByText("Signup Page")).toBeInTheDocument();
  });
});
