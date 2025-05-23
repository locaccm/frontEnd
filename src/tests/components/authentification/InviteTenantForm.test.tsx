import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InviteTenantForm from "../../../components/authentication/InviteTenantForm/InviteTenantForm.js";

describe("InviteTenantForm", () => {
  const alertMock = vi.fn();
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("alert", alertMock);
    vi.stubGlobal("fetch", fetchMock);
  });

  it("renders form inputs and button", () => {
    render(<InviteTenantForm />);
    expect(
      screen.getByPlaceholderText(/email du futur locataire/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/adresse/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /inviter/i }),
    ).toBeInTheDocument();
  });

  it("submits data correctly when all fields are filled", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, body: {} });

    render(<InviteTenantForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com", name: "USEC_MAIL" },
    });
    fireEvent.change(screen.getByPlaceholderText(/adresse/i), {
      target: { value: "123 rue de Paris", name: "ADDRESS" },
    });

    fireEvent.click(screen.getByRole("button", { name: /inviter/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/auth/invitetenant"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          USEC_MAIL: "test@example.com",
          ADDRESS: "123 rue de Paris",
          OWNER_NAME: "test",
        }),
      }),
    );
  });

  it("alerts when fetch fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Fetch failed"));

    render(<InviteTenantForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com", name: "USEC_MAIL" },
    });
    fireEvent.change(screen.getByPlaceholderText(/adresse/i), {
      target: { value: "123 rue de Paris", name: "ADDRESS" },
    });

    fireEvent.click(screen.getByRole("button", { name: /inviter/i }));

    await new Promise((r) => setTimeout(r, 0));

    expect(alertMock).toHaveBeenCalledWith(expect.any(Error));
  });
});
