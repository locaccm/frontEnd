import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import UserInfo from "../../../components/adminManagement/UserInfo.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module to control HTTP responses in tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake user data for tests
const fakeUser = {
  USEC_LNAME: "Smith",
  USEC_FNAME: "Anna",
  USEC_TYPE: "Admin",
  USEC_BIO: "Developer",
  USED_BIRTH: "1990-05-15T00:00:00.000Z",
  USEC_TEL: "0601020304",
  USEC_ADDRESS: "123 rue de Paris",
  USEC_MAIL: "anna.smith@email.com",
  USEC_PASSWORD: "secret",
};

describe("UserInfo component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock GET and PUT API methods
    // @ts-ignore
    api.get.mockResolvedValue({ data: fakeUser });
    // @ts-ignore
    api.put.mockResolvedValue({});
    // Mock the browser alert for testing
    window.alert = vi.fn();
  });

  test("displays user info after fetch", async () => {
    render(<UserInfo userId={1} />);
    // Wait for the user's first name to appear
    expect(await screen.findByDisplayValue("Anna")).toBeInTheDocument();
    // Check other key info is rendered
    expect(screen.getByDisplayValue("Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0601020304")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 rue de Paris")).toBeInTheDocument();
    expect(screen.getByDisplayValue("anna.smith@email.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1990-05-15")).toBeInTheDocument();
  });

  test("allows editing and saving user info", async () => {
    render(<UserInfo userId={1} />);
    // Wait for user info to appear
    expect(await screen.findByDisplayValue("Anna")).toBeInTheDocument();
    // Change last name field
    fireEvent.change(screen.getByDisplayValue("Smith"), {
      target: { value: "Doe" },
    });
    // Click the save button
    fireEvent.click(screen.getByText("Enregistrer"));
    // Assert API PUT called with updated data
    await waitFor(() =>
      // @ts-ignore
      expect(api.put).toHaveBeenCalledWith(
        "/users/1",
        expect.objectContaining({
          ...fakeUser,
          USEC_LNAME: "Doe",
        })
      )
    );
    // Check alert is called after save
    expect(window.alert).toHaveBeenCalledWith("Utilisateur mis à jour !");
  });

  test("shows loader if no user", async () => {
    // Force the API to return no data
    // @ts-ignore
    api.get.mockResolvedValueOnce({ data: null });
    render(<UserInfo userId={99} />);
    // Should show loading state
    expect(await screen.findByText("Chargement...")).toBeInTheDocument();
  });
});
