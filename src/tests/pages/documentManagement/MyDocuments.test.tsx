import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { fetchDocuments } from "../../../core/api/documentManagement/getDocument.js";
import { deleteDocument } from "../../../core/api/documentManagement/deleteDocument.js";
import MyDocuments from "../../../pages/documentManagement/MyDocuments.js";

vi.mock("../../../core/api/documentManagement/getDocument.js");
vi.mock("../../../core/api/documentManagement/deleteDocument.js");

const mockedFetch = vi.mocked(fetchDocuments);
const mockedDelete = vi.mocked(deleteDocument);

describe("MyDocuments", () => {
  const jwt = "fake-token";

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "confirm").mockReturnValue(true);
  });

  it("charge et affiche la liste de documents", async () => {
    const docs = [
      {
        name: "a.pdf",
        url: "urlA",
        created: "2023-01-01T00:00:00Z",
        leaseId: 1,
      },
      {
        name: "b.pdf",
        url: "urlB",
        created: "2023-02-02T00:00:00Z",
        leaseId: 2,
      },
    ];
    mockedFetch.mockResolvedValueOnce(docs);

    render(<MyDocuments jwt={jwt} />);

    const linkA = await screen.findByRole("link", {
      name: /a\.pdf/i,
    });
    expect(linkA).toBeInTheDocument();
    expect(linkA).toHaveAttribute("href", "urlA");

    const linkB = await screen.findByRole("link", {
      name: /b\.pdf/i,
    });
    expect(linkB).toBeInTheDocument();
    expect(linkB).toHaveAttribute("href", "urlB");
  });

  it("n’appelle pas deleteDocument si on annule la confirmation", async () => {
    mockedFetch.mockResolvedValueOnce([
      {
        name: "a.pdf",
        url: "urlA",
        created: "2023-01-01T00:00:00Z",
        leaseId: 1,
      },
    ]);
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    render(<MyDocuments jwt={jwt} />);
    await screen.findByRole("link", { name: /a\.pdf/i });

    fireEvent.click(screen.getByRole("button", { name: /Supprimer/i }));

    expect(deleteDocument).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: /a\.pdf/i })).toBeInTheDocument();
  });

  it("affiche une erreur si fetchDocuments échoue", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("Fetch failed"));

    render(<MyDocuments jwt={jwt} />);

    const errMsg = await screen.findByText(/Erreur : Fetch failed/i);
    expect(errMsg).toBeInTheDocument();
  });

  it("affiche une erreur si deleteDocument échoue", async () => {
    mockedFetch
      .mockResolvedValueOnce([
        {
          name: "x.pdf",
          url: "urlX",
          created: "2023-03-03T00:00:00Z",
          leaseId: 1,
        },
      ])
      .mockResolvedValueOnce([
        {
          name: "x.pdf",
          url: "urlX",
          created: "2023-03-03T00:00:00Z",
          leaseId: 1,
        },
      ]);

    mockedDelete.mockRejectedValueOnce(new Error("Delete failed"));

    render(<MyDocuments jwt={jwt} />);
    await screen.findByRole("link", { name: /x\.pdf/i });

    fireEvent.click(screen.getByRole("button", { name: /Supprimer/i }));

    const errDelete = await screen.findByText(/Erreur : Delete failed/i);
    expect(errDelete).toBeInTheDocument();
  });
});
