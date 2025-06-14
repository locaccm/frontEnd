// src/tests/pages/dashboardManagement/dashboardManagement.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../../pages/dashboardManagament/dashboardManagement.js";

// Mock all subcomponents to simplify the test
vi.mock("../../../components/dashboardManagement/UserInfo.js", () => ({
  __esModule: true,
  default: () => <div>UserInfo component</div>,
}));
vi.mock("../../../components/dashboardManagement/Accommodations.js", () => ({
  __esModule: true,
  default: () => <div>Accommodations component</div>,
}));
vi.mock("../../../components/dashboardManagement/Events.js", () => ({
  __esModule: true,
  default: () => <div>Events component</div>,
}));
vi.mock("../../../components/dashboardManagement/Messages.js", () => ({
  __esModule: true,
  default: () => <div>Messages component</div>,
}));

describe("Dashboard page", () => {
  it("renders all dashboard sections", () => {
    render(<Dashboard />);
    // Check for the main title
    expect(screen.getByText(/Tableau de Bord Utilisateur/)).toBeInTheDocument();
    // Check for subcomponents (mocked)
    expect(screen.getByText(/UserInfo component/)).toBeInTheDocument();
    expect(screen.getByText(/Accommodations component/)).toBeInTheDocument();
    expect(screen.getByText(/Events component/)).toBeInTheDocument();
    expect(screen.getByText(/Messages component/)).toBeInTheDocument();
  });
});
