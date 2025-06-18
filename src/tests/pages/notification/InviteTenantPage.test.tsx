import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InviteTenantPage from "../../../pages/notification/InviteTenantPage.js";

describe("InviteTenantPage", () => {
  it("renders the InviteTenantForm", () => {
    render(<InviteTenantPage />);

    expect(screen.getByPlaceholderText(/email du futur locataire/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/adresse/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /inviter/i })).toBeInTheDocument();
  });
});
