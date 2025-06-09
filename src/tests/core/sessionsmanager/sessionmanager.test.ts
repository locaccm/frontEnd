import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    getUserId,
    getToken,
    getEmail,
    getUserProfileData,
    setUserProfileData,
    initUserProfileSession,
} from "../../../core/session/SessionsManager.js";

vi.stubGlobal("sessionStorage", {
    getItem: vi.fn((key: string) => {
        const data: Record<string, string> = {
            userId: "1",
            token: "abc",
            userEmail: "john@example.com",
            userFirstName: "Jean",
            userLastName: "Dupont",
            userBirthDate: "1990-01-01",
            userPhotoUrl: "photo.jpg",
            userBio: "Dév passionné",
            userTel: "0600000000",
            userAddress: "1 rue de Paris",
        };
        return data[key] ?? null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

beforeAll(() => {
    vi.stubGlobal("import.meta", {
        env: {
            VITE_PROFILE_URL: "http://localhost:4000/",
        },
    });
});


describe("sessionManager", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("get functions should return correct values from sessionStorage", () => {
        expect(getUserId()).toBe("1");
        expect(getToken()).toBe("abc");
        expect(getEmail()).toBe("john@example.com"); // <- adapte si stocké
    });

    it("getUserProfileData should return full profile from sessionStorage", () => {
        const profile = getUserProfileData();
        expect(profile).toEqual({
            firstName: "Jean",
            lastName: "Dupont",
            birthDate: "1990-01-01",
            photoUrl: "photo.jpg",
            bio: "Dév passionné",
            tel: "0600000000",
            address: "1 rue de Paris",
        });
    });

    it("setUserProfileData should call sessionStorage.setItem with correct values", () => {
        const data = {
            firstName: "Alice",
            lastName: "Durand",
            birthDate: "1995-05-05",
            photoUrl: "avatar.jpg",
            bio: "Ingénieure",
            tel: "0707070707",
            address: "42 avenue du test",
        };
        setUserProfileData(data);

        expect(sessionStorage.setItem).toHaveBeenCalledWith("userFirstName", "Alice");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userLastName", "Durand");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userBirthDate", "1995-05-05");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userPhotoUrl", "avatar.jpg");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userBio", "Ingénieure");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userTel", "0707070707");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userAddress", "42 avenue du test");
    });

    it("initUserProfileSession fetches and stores data", async () => {
        const mockProfile = {
            firstName: "Test",
            lastName: "User",
            birthDate: "2000-01-01",
            photoUrl: "pic.jpg",
            bio: "test bio",
            tel: "0601020304",
            address: "Test Street",
        };

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockProfile,
        });

        vi.stubGlobal("fetch", fetchMock);

        await initUserProfileSession();

        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("/profiles/1"),
            expect.objectContaining({
                headers: { Authorization: "Bearer abc" },
            })
        );

        expect(sessionStorage.setItem).toHaveBeenCalledWith("userFirstName", "Test");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userLastName", "User");
        expect(sessionStorage.setItem).toHaveBeenCalledWith("userBirthDate", "2000-01-01");
    });
});
