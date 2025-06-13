import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Leases from "../../../components/adminManagement/Leases.js";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock the API module to control network behavior for all tests
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

import api from "../../../infrastructre/services/adminApi.js";

// Fake leases data used to populate the component for tests
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
    // Reset all mocks before every test to ensure clean state
    vi.clearAllMocks();
    // @ts-expect-error: mockResolvedValue is not typed on axios mock in unit tests
    api.get.mockResolvedValue({ data: fakeLeases });
    // @ts-expect-error: mockResolvedValue not in axios delete type in unit tests
    api.delete.mockResolvedValue({});
  });

  test("displays the list of leases", async () => {
    render(<Leases userId={3} />);
    // Check that both leases are rendered with correct info
    expect(await screen.findByText(/Du 01\/06\/2024 au 01\/06\/2025/)).toBeInTheDocument();
    expect(screen.getByText(/950€/)).toBeInTheDocument();
    expect(screen.getByText(/🟢 Actif/)).toBeInTheDocument();

    expect(screen.getByText(/Du 01\/01\/2023 au 31\/12\/2023/)).toBeInTheDocument();
    expect(screen.getByText(/850€/)).toBeInTheDocument();
    expect(screen.getByText(/🔴 Inactif/)).toBeInTheDocument();
  });

  test("deletes a lease", async () => {
    render(<Leases userId={5} />);
    // Wait for a lease to be displayed before interacting
    expect(await screen.findByText(/Du 01\/06\/2024 au 01\/06\/2025/)).toBeInTheDocument();
    // Click the first delete button (❌)
    fireEvent.click(screen.getAllByRole("button")[0]);
    // Assert the API DELETE was called with the correct lease ID
    await waitFor(() =>
      // @ts-expect-error: DELETE is mocked, not typed as axios in test
      expect(api.delete).toHaveBeenCalledWith("/leases/101")
    );
  });
});
