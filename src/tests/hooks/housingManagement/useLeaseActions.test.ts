import { renderHook, act } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { useLeaseActions } from "../../../hooks/housingManagement/useLeaseActions.js";
import { LeasePayload } from "../../../types/housingManagement/housingManagement.js";

const mockFetch = vi.fn();
const mockSessionStorage: Record<string, string> = {
  token: "fake-token",
  userId: "123",
};

vi.stubGlobal("fetch", mockFetch);
vi.stubGlobal("sessionStorage", {
  getItem: (key: string) => mockSessionStorage[key] || null,
});

describe("useLeaseActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchLeases - should return lease data on success", async () => {
    const mockLeases = [{ LEAD_START: "2025-01-01", USEN_ID: 123 }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockLeases,
    });

    const { result } = renderHook(() => useLeaseActions());

    let data = null;
    await act(async () => {
      data = await result.current.fetchLeases();
    });

    expect(data).toEqual(mockLeases);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("?userId=123"),
      expect.anything(),
    );
  });

  it("createLease - should post lease and return true on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    });

    const { result } = renderHook(() => useLeaseActions());

    const leasePayload: Omit<LeasePayload, "USEN_ID"> = {
      LEAD_START: "2025-01-01",
      LEAD_END: "2025-12-31",
      LEAN_RENT: 1000,
      LEAN_CHARGES: 200,
      LEAD_PAYMENT: "2025-01-05",
      LEAB_ACTIVE: true,
      ACCN_ID: 1,
    };

    let success = false;
    await act(async () => {
      success = await result.current.createLease(leasePayload);
    });

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/lease"),
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("updateLease - should send PUT request and return true on success", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useLeaseActions());

    let success = false;
    await act(async () => {
      success = await result.current.updateLease(42, { LEAN_RENT: 1200 });
    });

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/lease/42"),
      expect.objectContaining({
        method: "PUT",
      }),
    );
  });

  it("deleteLease - should send DELETE request and return true on success", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useLeaseActions());

    let success = false;
    await act(async () => {
      success = await result.current.deleteLease(42);
    });

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/lease/42"),
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  it("should handle missing userId in sessionStorage", async () => {
    mockSessionStorage.userId = "";

    const { result } = renderHook(() => useLeaseActions());

    let data = null;
    await act(async () => {
      data = await result.current.fetchLeases();
    });

    expect(data).toBeNull();
    expect(result.current.error).toBe("Utilisateur non connecté.");

    mockSessionStorage.userId = "123";
  });
});
