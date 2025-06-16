// src/tests/routes/routes.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutesContent from "../../components/routes/appRoutesContent.js";


describe("AppRoutes", () => {
  it("renders the landing page on '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutesContent />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/La gestion efficace des biens est la clé de la réussite immobilière/i)
    ).toBeInTheDocument();
  });
});
