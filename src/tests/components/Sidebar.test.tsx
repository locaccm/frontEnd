import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Sidebar from "../../components/Sidebar.js";

describe("Sidebar", () => {
  it("renders all navigation links and profile image", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const profileImg = screen.getByAltText("Profile");
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveClass("profile-pic");

    expect(screen.getByText("Wealth-management")).toBeInTheDocument();
    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("Leases")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();

    const profileLink = screen.getByRole("link", { name: "Profile" });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink.querySelector("img")).toBe(profileImg);
  });
});
