// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";




export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!email) {
      setErr("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr("Invalid email");
      return false;
    }
    setErr("");
    return true;
  };

  const handleResetLink = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await forgotPassword({ email });
      setMsg(res.message || "Email sent");

      // Navigate immediately with email state
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setErr(error?.message || "Failed to send link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full border rounded-md shadow-md p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot your password?
        </h2>

        {/*Added data-testid for unit testing */}
        <form
          onSubmit={handleResetLink}
          aria-label="forgot-form"
          data-testid="forgot-form"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {err && <p role="alert" className="text-red-500 text-sm">{err}</p>}
          {msg && <p role="status" className="text-green-600 text-sm">{msg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full p-2 mt-3 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
