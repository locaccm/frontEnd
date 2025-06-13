import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor, within } from "@testing-library/dom";
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
    vi.clearAllMocks();
    api.get.mockResolvedValue({ data: fakeLeases });
    api.delete.mockResolvedValue({});
  });

  test("displays the list of leases", async () => {
    render(<Leases userId={3} />);
    // Attends les items de la liste
    const leaseItems = await screen.findAllByRole("listitem");
    // Premier bail (actif)
    expect(leaseItems[0].textContent).toContain("Du 01/06/2024 au 01/06/2025");
    expect(leaseItems[0].textContent).toContain("950");
    expect(leaseItems[0].textContent).toContain("Actif");
    // Deuxième bail (inactif)
    expect(leaseItems[1].textContent).toContain("Du 01/01/2023 au 31/12/2023");
    expect(leaseItems[1].textContent).toContain("850");
    expect(leaseItems[1].textContent).toContain("Inactif");
  });

  test("deletes a lease", async () => {
    render(<Leases userId={5} />);
    // Attend la ligne du bail (qui contient la date et montant)
    const leaseItems = await screen.findAllByRole("listitem");
    expect(leaseItems[0].textContent).toContain("Du 01/06/2024 au 01/06/2025");
    // Clique sur le premier bouton de suppression
    fireEvent.click(within(leaseItems[0]).getByRole("button"));
    // Vérifie que l'appel DELETE a été fait
    await waitFor(() =>
      expect(api.delete).toHaveBeenCalledWith("/leases/101")
    );
  });
});
