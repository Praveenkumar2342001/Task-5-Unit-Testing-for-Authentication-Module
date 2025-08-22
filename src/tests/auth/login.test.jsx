// src/__tests__/auth/login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../components/auth/Login";
import * as authService from "../../services/authService";

// Mock API
jest.mock("../../services/authService", () => ({
  login: jest.fn(),
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login Component", () => {
  it("renders login form", () => {
    renderLogin();
    expect(screen.getByRole("form", { name: /login-form/i })).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    renderLogin();
    fireEvent.submit(screen.getByRole("form", { name: /login-form/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("submits form with correct values", async () => {
    authService.login.mockResolvedValueOnce({ token: "fake-jwt-token" });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("form", { name: /login-form/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });
});
