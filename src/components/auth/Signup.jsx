import { useState } from "react";
import * as authService from "../../services/authService";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

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
      const res = await authService.register(form);
      setMsg(res.message || "Signup successful ");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
      setMsg(err.message || "Signup failed ");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side (branding / illustration) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-10">
        <div className="text-center text-white max-w-md">
          <h1 className="text-5xl font-extrabold mb-4">Join Us Today</h1>
          <p className="text-lg text-gray-200">
            Create an account to unlock all features and get started.
          </p>
        </div>
      </div>

      {/* Right side (signup form) */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 bg-white px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign Up</h1>
            <p className="text-gray-500 mt-2">
              Create your account in just a few steps
            </p>
          </div>

          {/* Social signup */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium shadow hover:bg-gray-50 transition">
              <FcGoogle className="mr-2 text-xl" /> Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium shadow hover:bg-gray-50 transition">
              <FaApple className="mr-2 text-xl" /> Sign up with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Signup form */}
          <form aria-label="signup-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a new  password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-testid="signup-submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Status / Error Message */}
          {msg && <p className="text-center text-green-600 mt-4">{msg}</p>}

          {/* Login link */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
