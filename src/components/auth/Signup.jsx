import React, { useState } from "react";
import { register } from "../../services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let errs = {};

    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (!form.confirmPassword) {
      errs.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!validate()) return;

    try {
      const res = await register(form);
      setMsg(res.message || "Signup successful");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
      setMsg(err.message || "Signup failed");
    }
  };

  return (
    <div>
      <form aria-label="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p role="alert" className="text-red-500">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p role="alert" className="text-red-500">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p role="alert" className="text-red-500">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"   
          placeholder="confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p role="alert" className="text-red-500">{errors.confirmPassword}</p>
        )}

        <button type="submit">Sign Up</button>

        {msg && <p role="status" className="text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
