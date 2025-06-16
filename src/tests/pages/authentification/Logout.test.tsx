import { vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Logout from "../../../components/authentication/Logout.js";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Logout", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", "fakeToken");
    localStorage.setItem("authToken", "fakeLocalToken");
    mockedNavigate.mockClear();
  });

  test("clears session and redirects", () => {
    render(
      <MemoryRouter initialEntries={["/logout"]}>
        <Routes>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MemoryRouter>
    );

    expect(sessionStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("authToken")).toBe(null);
    expect(mockedNavigate).toHaveBeenCalledWith("/signin");
  });
});
