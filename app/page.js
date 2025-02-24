"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      const user = JSON.parse(data.token); // Parse token once
      const userRole = user.role.toLowerCase(); // Extract role
      const userEmail = user.email;
      const userId = user.id;

      localStorage.setItem("user", data.token);
      sessionStorage.setItem("userRole", userRole); // Store user role for tracking
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userEmail", userEmail);

      // Send event to Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "userLogin",
        user_email: userEmail, // Extract email from token
      });

      if (typeof clarity !== "undefined") {
        clarity("set", "UserRole", userRole);
        window.clarity("identify", userEmail);
      }

      clarity.identify(userId, { role: userRole, email: userEmail }); //Test code to identify userRole and userEmail.

      // Redirect to dashboard based on role
      router.push(`/${userRole}-dashboard`);
    } else {
      setError(data.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
