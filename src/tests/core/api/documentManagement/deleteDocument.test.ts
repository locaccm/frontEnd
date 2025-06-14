import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deleteDocument } from "../../../../core/api/documentManagement/deleteDocument.js";

describe("deleteDocument", () => {
  const jwt = "fake-jwt";
  const baseUrl = "http://api.test";
  const rawFilename = "file name.pdf";
  const encodedFilename = encodeURIComponent(rawFilename);
  const fullUrl = `${baseUrl}/documents/${encodedFilename}`;

  beforeEach(() => {
    (import.meta.env as any).VITE_API_URL_DOCUMENT_MANAGEMENT = baseUrl;
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("appelle fetch avec DELETE et ne jette pas si response.ok", async () => {
    // @ts-expect-error mock global.fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
    });

    await expect(deleteDocument(rawFilename, jwt)).resolves.toBeUndefined();

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  });

  it("jette l’erreur du champ message du JSON si présent", async () => {
    const serverMsg = "Suppression impossible";
    // @ts-expect-error mock global.fetch
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce({ message: serverMsg }),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      serverMsg,
    );

    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("jette l’erreur du champ error du JSON si présent", async () => {
    const serverErr = "Token invalide";
    // @ts-expect-error mock global.fetch
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValueOnce({ error: serverErr }),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      serverErr,
    );

    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("jette un message générique si le JSON échoue ou ne contient pas message/error", async () => {
    // @ts-expect-error mock global.fetch
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: vi.fn().mockRejectedValueOnce(new Error("Bad JSON")),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      "Erreur 404 lors de la suppression",
    );

    expect(global.fetch).toHaveBeenCalledOnce();
  });
});
