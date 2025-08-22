import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "../../components/auth/ResetPassword";
import * as authService from "../../services/authService";


jest.mock("../../services/authService", () => ({
  resetPassword: jest.fn(),
}));


const renderReset = () =>
  render(
    <MemoryRouter>
      <ResetPassword />
    </MemoryRouter>
  );

describe("Reset Password Component", () => {
  it("renders reset password form", () => {
    renderReset();
    expect(screen.getByRole("form", { name: /reset-form/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    renderReset();
    fireEvent.submit(screen.getByRole("form", { name: /reset-form/i }));

    // Use exact text matching to avoid multiple element error
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(await screen.findByText("Confirm Password is required")).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    renderReset();

    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: "newpassword" },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.submit(screen.getByRole("form", { name: /reset-form/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("submits form with correct values", async () => {
    authService.resetPassword.mockResolvedValueOnce({
      message: "Password reset successful",
    });

    renderReset();

    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: "newpassword" },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "newpassword" },
    });

    fireEvent.submit(screen.getByRole("form", { name: /reset-form/i }));

    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith({
        password: "newpassword",
      });
    });

    expect(await screen.findByText(/password reset successful/i)).toBeInTheDocument();
  });
});