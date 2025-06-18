import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppRoutes from "../../routes/appRoutes.js";

vi.mock("../../components/routes/appRoutesContent.tsx", () => {
  return {
    __esModule: true,
    default: () => <div>Mocked AppRoutesContent</div>,
  };
});

describe("AppRoutes", () => {
  it("renders AppRoutesContent inside BrowserRouter", () => {
    render(<AppRoutes />);
    expect(screen.getByText("Mocked AppRoutesContent")).toBeInTheDocument();
  });
});
