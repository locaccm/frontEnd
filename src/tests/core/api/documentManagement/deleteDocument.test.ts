import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deleteDocument } from "../../../../core/api/documentManagement/deleteDocument.js";
import * as SessionsManager from "../../../../core/session/SessionsManager.js";

describe("deleteDocument", () => {
  const jwt = "fake-jwt";
  const baseUrl = "http://api.test";
  const bucketName = "locaccm-bucket";
  const rawFilename = "file name.pdf";
  const encodedFilename = encodeURIComponent(rawFilename);
  const fullUrl = `${baseUrl}/api/documents/${encodedFilename}`;

  let getUserIdMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    (import.meta.env as any).VITE_API_URL_DOCUMENT_MANAGEMENT = baseUrl;
    global.fetch = vi.fn();
    getUserIdMock = vi
      .spyOn(SessionsManager, "getUserId")
      .mockReturnValue("123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("appelle fetch avec DELETE et ne jette pas si response.ok", async () => {
    // @ts-expect-error fetch mock
    global.fetch.mockResolvedValueOnce({ ok: true });

    await expect(deleteDocument(rawFilename, jwt)).resolves.toBeUndefined();

    expect(getUserIdMock).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ bucketName, userId: "123" }),
    });
  });

  it('jette "User not logged in" si getUserId retourne null', async () => {
    getUserIdMock.mockReturnValueOnce(null);

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      "User not logged in",
    );

    expect(getUserIdMock).toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("jette l’erreur du champ message du JSON si présent", async () => {
    const serverMsg = "Suppression impossible";
    // @ts-expect-error fetch mock
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce({ message: serverMsg }),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      serverMsg,
    );

    expect(getUserIdMock).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("jette l’erreur du champ error du JSON si présent", async () => {
    const serverErr = "Token invalide";
    // @ts-expect-error fetch mock
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValueOnce({ error: serverErr }),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      serverErr,
    );

    expect(getUserIdMock).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("jette un message générique si le JSON échoue ou ne contient pas message/error", async () => {
    // @ts-expect-error fetch mock
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: vi.fn().mockRejectedValueOnce(new Error("Bad JSON")),
    });

    await expect(deleteDocument(rawFilename, jwt)).rejects.toThrowError(
      "Erreur 404 lors de la suppression",
    );

    expect(getUserIdMock).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
