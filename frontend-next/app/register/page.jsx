"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("Registering...");
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      setMsg("Registered successfully. Please login.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMsg("Wrong" + err.message);
    }
  }

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 5 }}>Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 5 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Register
          </button>
        </form>
        {msg && (
          <p
            style={{
              textAlign: "center",
              marginTop: 15,
              color: msg.includes("") ? "green" : "red",
              fontSize: 14,
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
