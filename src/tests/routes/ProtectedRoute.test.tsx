import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/routes/ProtectedRoute.js";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("redirects to /signin if no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Page</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Signin Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Signin Page")).toBeInTheDocument();
  });

  test("renders children if token is present", () => {
    sessionStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Page</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Signin Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected Page")).toBeInTheDocument();
  });
});
