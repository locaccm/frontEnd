import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../../pages/adminManagement/adminManagement.js";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock API
vi.mock("../../../infrastructre/services/adminApi.js", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [
      { USEN_ID: 1, USEC_TYPE: "admin", USEC_FNAME: "Alice", USEC_LNAME: "Dupont" },
      { USEN_ID: 2, USEC_TYPE: "user", USEC_FNAME: "Bob", USEC_LNAME: "Martin" },
    ] }),
  },
}));

describe("Admin Management App Page", () => {
  test("renders header and users table", async () => {
    render(<App />);
    // Test true content
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Déconnexion")).toBeInTheDocument();
    expect(await screen.findByText("Liste des utilisateurs")).toBeInTheDocument();
    expect(screen.getByText("Dupont")).toBeInTheDocument();
    expect(screen.getByText("Martin")).toBeInTheDocument();
  });

  test("shows sidebar when a user row is clicked", async () => {
    render(<App />);
  
    const userRow = await screen.findByText("Dupont");
    const tr = userRow.closest("tr");
    if (tr) {
      fireEvent.click(tr);
    }    
    expect(screen.getByText("User Info")).toBeInTheDocument();
    expect(screen.getByLabelText("Fermer la barre latérale")).toBeInTheDocument();
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });
});
