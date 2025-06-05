import { renderHook, act } from "@testing-library/react";
import { useAccommodationActions } from "../../../hooks/wealthManagement/useAccommodationActions.js";
import { vi } from "vitest";

global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  sessionStorage.setItem("userId", "1");
  sessionStorage.setItem("token", "fake-token");
});

describe("useAccommodationActions", () => {
  it("fetchAccommodations - succes", async () => {
    const mockData = [{ ACCN_ID: 1, ACCC_NAME: "Test logement" }];
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() => result.current.fetchAccommodations());

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/read?userId=1"),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer fake-token" }),
      })
    );
    expect(res).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("fetchAccommodations - server error", async () => {
    (fetch as any).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() => result.current.fetchAccommodations());

    expect(res).toBeNull();
    expect(result.current.error).toBe("Échec du chargement des logements.");
  });

  it("fetchAccommodations - user not connected", async () => {
    sessionStorage.removeItem("userId");
    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() => result.current.fetchAccommodations());

    expect(res).toBeNull();
    expect(result.current.error).toBe("Utilisateur non connecté.");
  });

  it("createAccommodation - success", async () => {
    (fetch as any).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() =>
      result.current.createAccommodation({
        ACCC_NAME: "Logement",
        ACCC_TYPE: "Appartement",
        ACCC_ADDRESS: "Paris",
        ACCC_DESC: "Très bien",
        ACCB_AVAILABLE: true,
      })
    );

    expect(res).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("createAccommodation - server error", async () => {
    (fetch as any).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() =>
      result.current.createAccommodation({
        ACCC_NAME: "Logement",
        ACCC_TYPE: "Appartement",
        ACCC_ADDRESS: "Paris",
        ACCC_DESC: "Très bien",
        ACCB_AVAILABLE: true,
      })
    );

    expect(res).toBe(false);
    expect(result.current.error).toBe("Échec de la création du logement.");
  });

  it("updateAccommodation - success", async () => {
    (fetch as any).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() =>
      result.current.updateAccommodation(5, {
        ACCC_NAME: "Modif",
        ACCC_TYPE: "Maison",
        ACCC_ADDRESS: "Lyon",
        ACCC_DESC: "Maj",
        ACCB_AVAILABLE: false,
      })
    );

    expect(res).toBe(true);
  });

  it("deleteAccommodation - server error", async () => {
    (fetch as any).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() => result.current.deleteAccommodation(5));

    expect(res).toBe(false);
    expect(result.current.error).toBe("Échec de la suppression du logement.");
  });

  it("deleteAccommodation - user not connected", async () => {
    sessionStorage.removeItem("userId");

    const { result } = renderHook(() => useAccommodationActions());
    const res = await act(() => result.current.deleteAccommodation(5));

    expect(res).toBe(false);
    expect(result.current.error).toBe("Utilisateur non connecté.");
  });
});
