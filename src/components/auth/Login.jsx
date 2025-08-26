import { useState } from "react";
import * as authService from "../../services/authService";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // reset server error
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      await authService.login(form);
    } catch (err) {
      setServerError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image / Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-10">
        <div className="text-center text-white max-w-md">
          <h1 className="text-5xl font-extrabold mb-4">Login Page</h1>
          <p className="text-lg text-gray-200">
            Welcome back! Please Login into Account.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 bg-white px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">
              Please login into your account
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium shadow hover:bg-gray-50 transition">
              <FcGoogle className="mr-2 text-xl" /> Login with Google
            </button>
            <button className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium shadow hover:bg-gray-50 transition">
              <FaApple className="mr-2 text-xl" /> Login with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            role="form"
            aria-label="login-form"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your mail"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
              {/* Forgot link moved below input */}
              <div className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-sm text-red-600 text-center">{serverError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"            >
              Login
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
