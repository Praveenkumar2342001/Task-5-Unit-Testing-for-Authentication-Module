// src/components/auth/ResetPassword.jsx
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as authService from "../../services/authService";

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const res = await authService.resetPassword({
          email,
          password: form.password,
        });
        setMessage(res.message || "Password reset successful");
      } catch (err) {
        setMessage("Error resetting password");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        role="form"
        aria-label="reset-form"
        data-testid="reset-form"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        {email && (
          <p className="text-sm text-gray-600 mb-4 text-center">
            Resetting password for: <span className="font-medium">{email}</span>
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p role="alert" className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p role="alert" className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p role="status" className="text-green-600 mt-4 text-center">{message}</p>}

        <p className="text-center text-sm mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
