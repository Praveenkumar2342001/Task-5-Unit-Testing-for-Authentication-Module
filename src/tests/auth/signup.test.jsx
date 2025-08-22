import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../../components/auth/Signup";
import * as authService from "../../services/authService";

// mock API
jest.mock("../../services/authService", () => ({
  register: jest.fn(),
}));

const renderSignup = () =>
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("validates required fields", async () => {
    renderSignup();

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/^password is required$/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/^confirm password is required$/i)
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    authService.register.mockResolvedValueOnce({ message: "User registered" });

    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@example.com" },
    });


    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/^confirm password$/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() =>
      expect(authService.register).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      })
    );

    expect(await screen.findByText(/user registered/i)).toBeInTheDocument();
  });
});
