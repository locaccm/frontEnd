import { getUserById, getTenantsByOwner, getOwnerByTenant, getMessages, sendMessage, } from "../../../../core/api/chatManagement/chatApi.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
vi.stubGlobal("sessionStorage", {
    getItem: vi.fn(() => "mocked-token"),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});
const API_BASE = `${import.meta.env.VITE_CHAT_URL}/api`;
let fetchMock;
beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
    vi.restoreAllMocks();
});
describe("chatApi", () => {
    describe("getUserById", () => {
        it("returns owner user if found", async () => {
            const mockUser = { USEN_ID: 1, USEC_TYPE: "OWNER", USEC_FNAME: "Alice", USEC_LNAME: "Doe" };
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });
            const user = await getUserById(1);
            expect(user).toEqual(mockUser);
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/owners/1`, expect.anything());
        });
        it("returns tenant user if not found as owner", async () => {
            const mockTenant = { USEN_ID: 2, USEC_TYPE: "TENANT", USEC_FNAME: "Bob", USEC_LNAME: "Smith" };
            fetchMock
                .mockResolvedValueOnce({ ok: false }) // owner not found
                .mockResolvedValueOnce({
                ok: true,
                json: async () => mockTenant,
            });
            const user = await getUserById(2);
            expect(user).toEqual(mockTenant);
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/owners/2`, expect.anything());
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/tenants/2`, expect.anything());
        });
        it("throws error if user not found", async () => {
            fetchMock
                .mockResolvedValueOnce({ ok: false })
                .mockResolvedValueOnce({ ok: false });
            await expect(getUserById(99)).rejects.toThrow("User not found");
        });
    });
    describe("getTenantsByOwner", () => {
        it("returns tenant list", async () => {
            const mockTenants = [{ USEN_ID: 2, USEC_TYPE: "TENANT", USEC_FNAME: "Bob", USEC_LNAME: "Smith" }];
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => mockTenants,
            });
            const tenants = await getTenantsByOwner(1);
            expect(tenants).toEqual(mockTenants);
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/owners/1/tenants`, expect.anything());
        });
        it("throws error if request fails", async () => {
            fetchMock.mockResolvedValueOnce({ ok: false });
            await expect(getTenantsByOwner(1)).rejects.toThrow("Error fetching tenants");
        });
    });
    describe("getOwnerByTenant", () => {
        it("returns owner data", async () => {
            const mockOwner = { USEN_ID: 1, USEC_TYPE: "OWNER", USEC_FNAME: "Alice", USEC_LNAME: "Doe" };
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => mockOwner,
            });
            const owner = await getOwnerByTenant(2);
            expect(owner).toEqual(mockOwner);
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/tenants/2/owner`, expect.anything());
        });
        it("throws error if request fails", async () => {
            fetchMock.mockResolvedValueOnce({ ok: false });
            await expect(getOwnerByTenant(2)).rejects.toThrow("Error fetching owner");
        });
    });
    describe("getMessages", () => {
        it("returns message list", async () => {
            const mockMessages = [
                { MESN_SENDER: 1, MESN_RECEIVER: 2, MESC_CONTENT: "Hello", MESD_DATE: new Date() },
            ];
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMessages,
            });
            const messages = await getMessages(1, 2);
            expect(messages).toEqual(mockMessages);
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/messages?from=1&to=2`, expect.anything());
        });
        it("throws error if fetch fails", async () => {
            fetchMock.mockResolvedValueOnce({ ok: false });
            await expect(getMessages(1, 2)).rejects.toThrow("Failed to fetch messages");
        });
    });
    describe("sendMessage", () => {
        it("sends a message and returns success", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });
            const result = await sendMessage(1, 2, "Hi!");
            expect(result).toEqual({ success: true });
            expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer mocked-token",
                },
                body: JSON.stringify({ sender: 1, receiver: 2, content: "Hi!" }),
            });
        });
        it("throws error if send fails", async () => {
            fetchMock.mockResolvedValueOnce({ ok: false });
            await expect(sendMessage(1, 2, "Test")).rejects.toThrow("Failed to send message");
        });
    });
});
