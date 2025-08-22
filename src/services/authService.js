// --- Login Service ---
export async function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ token: "mock-jwt" });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 200);
  });
}

// --- Register Service ---
export async function register({ name, email, password, confirmPassword }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name) return reject({ message: "Name is required" });
      if (!email || !email.includes("@")) return reject({ message: "Invalid email" });
      if (!password) return reject({ message: "Password is required" });
      if (!confirmPassword) return reject({ message: "Confirm Password is required" });
      if (password !== confirmPassword) return reject({ message: "Passwords do not match" });

      resolve({ message: "User registered" }); 
    }, 200);
  });
}

// --- Forgot Password Service ---
export async function forgotPassword({ email }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !email.includes("@")) {
        return reject({ message: "Invalid email" });
      }
      resolve({ message: "Password reset link sent" });
    }, 200);
  });
}

// --- Reset Password Service ---
export async function resetPassword({ password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!password) {
        return reject({ message: "Password is required" });
      }
      resolve({ message: "Password reset successful" });
    }, 200);
  });
}
