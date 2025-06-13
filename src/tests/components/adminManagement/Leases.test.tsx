import React from "react";
import { render, within } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Leases from "../../../components/adminManagement/Leases.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module so we control network behavior for all tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake leases data used for the tests
const fakeLeases = [
  {
    LEAN_ID: 101,
    LEAD_START: "2024-06-01T00:00:00.000Z",
    LEAD_END: "2025-06-01T00:00:00.000Z",
    LEAN_RENT: 950,
    LEAN_CHARGES: 50,
    LEAB_ACTIVE: true,
  },
  {
    LEAN_ID: 102,
    LEAD_START: "2023-01-01T00:00:00.000Z",
    LEAD_END: "2023-12-31T00:00:00.000Z",
    LEAN_RENT: 850,
    LEAN_CHARGES: 40,
    LEAB_ACTIVE: false,
  },
];

describe("Leases component", () => {
  beforeEach(() => {
    // Reset all mocks before every test for test isolation
    vi.clearAllMocks();
    api.get.mockResolvedValue({ data: fakeLeases });
    api.delete.mockResolvedValue({});
  });

  test("displays the list of leases", async () => {
    render(<Leases userId={3} />);
    // Wait for all lease list items to render
    const leaseItems = await screen.findAllByRole("listitem");
    // First lease (active): check the full string and relevant values
    expect(leaseItems[0].textContent).toMatch(
      /Du\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}\s+au\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}/
    );
    expect(leaseItems[0].textContent).toContain("950");
    expect(leaseItems[0].textContent).toContain("Actif");
    // Second lease (inactive)
    expect(leaseItems[1].textContent).toMatch(
      /Du\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}\s+au\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}/
    );
    expect(leaseItems[1].textContent).toContain("850");
    expect(leaseItems[1].textContent).toContain("Inactif");
  });

  test("deletes a lease", async () => {
    render(<Leases userId={5} />);
    // Wait for the first lease row to render
    const leaseItems = await screen.findAllByRole("listitem");
    expect(leaseItems[0].textContent).toMatch(
      /Du\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}\s+au\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}/
    );
    // Click the first delete button in the lease item
    fireEvent.click(within(leaseItems[0]).getByRole("button"));
    // Wait for the DELETE API call
    await waitFor(() =>
      expect(api.delete).toHaveBeenCalledWith("/leases/101")
    );
  });
});
