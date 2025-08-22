import React, { useState } from "react";
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) { setErr("Email is required"); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setErr("Invalid email"); return false; }
    setErr(""); return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await forgotPassword({ email });
      setMsg(res.message || "Email sent");
    } catch (error) {
      setErr(error?.message || "Failed to send link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} aria-label="forgot-form">
      <h1>Forgot Password</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {err && <p role="alert">{err}</p>}
      {msg && <p role="status">{msg}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Send Reset Link"}
      </button>
    </form>
  );
}
