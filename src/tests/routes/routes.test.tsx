// src/tests/routes/routes.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutesContent from "../../components/routes/appRoutesContent.js";

// Mock home page
vi.mock("../../pages/home.js", () => ({
  default: () => <div>Home Page</div>,
}));

describe("AppRoutes", () => {
  it("renders the home page on '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutesContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
