import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DocumentWrapper from "../../routes/DocumentWrapper.js";

vi.mock("../../pages/documentManagement/documentManagement.js", () => ({
  default: ({ leaseId }: { leaseId: number }) => (
    <div>DocumentManagement for lease {leaseId}</div>
  ),
}));

describe("DocumentWrapper", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("redirects to /signin when no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/document-management/123"]}>
        <Routes>
          <Route path="/signin" element={<div>Sign In Page</div>} />
          <Route path="/document-management/:leaseId" element={<DocumentWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });

  it("shows error for invalid leaseId", () => {
    sessionStorage.setItem("token", "valid-token");
    sessionStorage.setItem("userId", "1");

    render(
      <MemoryRouter initialEntries={["/document-management/not-a-number"]}>
        <Routes>
          <Route path="/document-management/:leaseId" element={<DocumentWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Unauthorized access or missing information/i)).toBeInTheDocument();
  });

  it("renders DocumentManagement with valid leaseId and token", () => {
    sessionStorage.setItem("token", "valid-token");
    sessionStorage.setItem("userId", "1");

    render(
      <MemoryRouter initialEntries={["/document-management/42"]}>
        <Routes>
          <Route path="/document-management/:leaseId" element={<DocumentWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("DocumentManagement for lease 42")).toBeInTheDocument();
  });
});
