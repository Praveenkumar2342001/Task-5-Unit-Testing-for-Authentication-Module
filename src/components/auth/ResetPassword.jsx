import { useState } from "react";
import * as authService from "../../services/authService";

export default function ResetPassword() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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
        const res = await authService.resetPassword({ password: form.password });
        setMessage(res.message || "Password reset successful");
      } catch (err) {
        setMessage("Error resetting password");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        aria-label="reset-form"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-96"
      >
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit
        </button>

        {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}
