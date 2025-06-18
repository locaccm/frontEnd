import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import MainLayout from "../../layout/MainLayout.js";

vi.mock("../../components/Sidebar.tsx", () => ({
  default: () => <div>Sidebar</div>,
}));

describe("MainLayout", () => {
  it("renders Sidebar and child route content", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<div>Profile Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });
});
