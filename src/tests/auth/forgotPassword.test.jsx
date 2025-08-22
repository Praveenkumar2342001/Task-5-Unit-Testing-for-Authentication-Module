import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../../components/auth/ForgotPassword";

jest.mock("../../services/authService", () => ({
  forgotPassword: jest.fn(),  
}));

import { forgotPassword } from "../../services/authService";

describe("ForgotPassword Component", () => {
  test("shows error if email is empty", async () => {
    render(<ForgotPassword />);
    fireEvent.submit(screen.getByRole("form", { name: /forgot-form/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Email is required");
  });

  test("submits form and shows success", async () => {
    forgotPassword.mockResolvedValueOnce({ message: "Email sent successfully" }); 
    render(<ForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("form", { name: /forgot-form/i }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Email sent successfully")
    );
  });
});
