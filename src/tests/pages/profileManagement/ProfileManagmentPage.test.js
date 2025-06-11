import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import Profile from "../../../pages/profileManagement/profileManagement.js";
import { describe, test, expect } from "vitest";
vi.mock("../../../components/profilManagement/ProfileForm.js", () => ({
    __esModule: true,
    default: () => _jsx("div", { "data-testid": "mock-profile-form", children: "ProfileForm" }),
}));
describe("Profile Management Page", () => {
    test("renders page and form", () => {
        render(_jsx(Profile, {}));
        expect(screen.getByText("Modifier vos informations")).toBeInTheDocument();
        expect(screen.getByTestId("mock-profile-form")).toBeInTheDocument();
    });
});
