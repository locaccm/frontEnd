import { render, screen } from "@testing-library/react";
import Profile from "../../../pages/profileManagement/profileManagement.js";
import { describe, test, expect } from "vitest";

vi.mock("../../../components/profilManagement/ProfileForm.js", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-profile-form">ProfileForm</div>,
}));

describe("Profile Management Page", () => {
  test("renders page and form", () => {
    render(<Profile />);
    expect(screen.getByText("Modifier vos informations")).toBeInTheDocument();
    expect(screen.getByTestId("mock-profile-form")).toBeInTheDocument();
  });
});
