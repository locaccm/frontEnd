import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Sidebar from "../../components/Sidebar.js";

describe("Sidebar", () => {
  it("renders all navigation links, profile image and logout button", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const profileImg = screen.getByAltText("Profile");
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveClass("profile-pic");

    expect(screen.getByText("Wealth-management")).toBeInTheDocument();
    expect(screen.getByText("Leases")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Chats")).toBeInTheDocument();

    const profileLink = profileImg.closest("a");
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute("href", "/profile");

    const logoutButton = screen.getByRole("button", { name: /déconnexion/i });
    expect(logoutButton).toBeInTheDocument();

    const logoutLink = logoutButton.querySelector("a");
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveClass("logout-link");
    expect(logoutLink).toHaveAttribute("href", "/logout");
  });
});
