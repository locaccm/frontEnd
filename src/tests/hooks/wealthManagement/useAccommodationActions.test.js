import { renderHook, act } from "@testing-library/react";
import { useAccommodationActions } from "../../../hooks/wealthManagement/useAccommodationActions.js";
import { vi } from "vitest";
const mockedFetch = vi.fn();
global.fetch = mockedFetch;
beforeEach(() => {
    vi.resetAllMocks();
    sessionStorage.setItem("userId", "1");
    sessionStorage.setItem("token", "fake-token");
});
describe("useAccommodationActions", () => {
    it("fetchAccommodations - success", async () => {
        const mockData = [{ ACCN_ID: 1, ACCC_NAME: "Test logement" }];
        mockedFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });
        const { result } = renderHook(() => useAccommodationActions());
        let res = null;
        await act(async () => {
            res = await result.current.fetchAccommodations();
        });
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/read?userId=1"), expect.objectContaining({
            headers: expect.objectContaining({ Authorization: "Bearer fake-token" }),
        }));
        expect(res).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });
    it("fetchAccommodations - server error", async () => {
        mockedFetch.mockResolvedValueOnce({ ok: false });
        const { result } = renderHook(() => useAccommodationActions());
        let res = null;
        await act(async () => {
            res = await result.current.fetchAccommodations();
        });
        expect(res).toBeNull();
        expect(result.current.error).toBe("Échec du chargement des logements.");
    });
    it("fetchAccommodations - user not connected", async () => {
        sessionStorage.removeItem("userId");
        const { result } = renderHook(() => useAccommodationActions());
        let res = null;
        await act(async () => {
            res = await result.current.fetchAccommodations();
        });
        expect(res).toBeNull();
        expect(result.current.error).toBe("Utilisateur non connecté.");
    });
    it("createAccommodation - success", async () => {
        mockedFetch.mockResolvedValueOnce({ ok: true });
        const { result } = renderHook(() => useAccommodationActions());
        const payload = {
            ACCC_NAME: "Logement",
            ACCC_TYPE: "Appartement",
            ACCC_ADDRESS: "Paris",
            ACCC_DESC: "Très bien",
            ACCB_AVAILABLE: true,
        };
        let res = false;
        await act(async () => {
            res = await result.current.createAccommodation(payload);
        });
        expect(res).toBe(true);
        expect(result.current.error).toBeNull();
    });
    it("createAccommodation - server error", async () => {
        mockedFetch.mockResolvedValueOnce({ ok: false });
        const { result } = renderHook(() => useAccommodationActions());
        const payload = {
            ACCC_NAME: "Logement",
            ACCC_TYPE: "Appartement",
            ACCC_ADDRESS: "Paris",
            ACCC_DESC: "Très bien",
            ACCB_AVAILABLE: true,
        };
        let res = true;
        await act(async () => {
            res = await result.current.createAccommodation(payload);
        });
        expect(res).toBe(false);
        expect(result.current.error).toBe("Échec de la création du logement.");
    });
    it("updateAccommodation - success", async () => {
        mockedFetch.mockResolvedValueOnce({ ok: true });
        const { result } = renderHook(() => useAccommodationActions());
        const updates = {
            ACCC_NAME: "Modif",
            ACCC_TYPE: "Maison",
            ACCC_ADDRESS: "Lyon",
            ACCC_DESC: "Maj",
            ACCB_AVAILABLE: false,
        };
        let res = false;
        await act(async () => {
            res = await result.current.updateAccommodation(5, updates);
        });
        expect(res).toBe(true);
        expect(result.current.error).toBeNull();
    });
    it("deleteAccommodation - server error", async () => {
        mockedFetch.mockResolvedValueOnce({ ok: false });
        const { result } = renderHook(() => useAccommodationActions());
        let res = true;
        await act(async () => {
            res = await result.current.deleteAccommodation(5);
        });
        expect(res).toBe(false);
        expect(result.current.error).toBe("Échec de la suppression du logement.");
    });
    it("deleteAccommodation - user not connected", async () => {
        sessionStorage.removeItem("userId");
        const { result } = renderHook(() => useAccommodationActions());
        let res = true;
        await act(async () => {
            res = await result.current.deleteAccommodation(5);
        });
        expect(res).toBe(false);
        expect(result.current.error).toBe("Utilisateur non connecté.");
    });
});
