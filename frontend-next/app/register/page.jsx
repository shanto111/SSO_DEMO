"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setMsg("Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMsg("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const box = {
    background: "#f4f6fb",
    padding: 30,
    borderRadius: 10,
    width: "100%",
    maxWidth: 380,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };
  const input = {
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 15,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={box}>
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Register</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 14 }}>
          Create your account
        </p>

        {msg && (
          <p
            style={{
              background: msg.includes("success") ? "#e6ffed" : "#ffeaea",
              color: msg.includes("success") ? "#1a7f37" : "#b30000",
              padding: 8,
              borderRadius: 5,
              textAlign: "center",
              fontSize: 14,
              margin: "10px 0",
            }}
          >
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={input}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 10,
              background: loading ? "#a3b3ff" : "#4a6cf7",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, marginTop: 15 }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#4a6cf7", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
