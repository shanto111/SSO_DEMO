"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    let mounted = true;

    async function fetchProtected() {
      setMsg("");
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" };

      try {
        const res = await fetch(`${API}/protected`, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!mounted) return;

        if (res.ok) {
          const d = await res.json();
          setData(d);
        } else if (res.status === 401) {
          setMsg("Unauthorized. Please login.");
        } else {
          const txt = await res.text();
          setMsg(txt || `Error: ${res.status}`);
        }
      } catch (err) {
        if (!mounted) return;
        setMsg("Network error: " + err.message);
      }
    }

    fetchProtected();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome to Your Dashboard</h2>

        {msg && <p className="dashboard-msg">{msg}</p>}

        {data ? (
          <div className="dashboard-sections">
            <div className="dashboard-section user-info">
              <h3>User Information</h3>
              <p>User ID: {data.user?.id}</p>
              <p>Email: {data.user?.email}</p>
            </div>

            <div className="dashboard-section protected-msg">
              <h3>Protected Message</h3>
              <p>{data.message}</p>
            </div>

            <div className="dashboard-section orders">
              <h3>Your Orders</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.orders?.length > 0 ? (
                    data.orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.item}</td>
                        <td>{o.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No orders</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !msg && <p className="loading-msg">Loading...</p>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #e0d7ff, #f8f9ff);
          padding: 2rem;
        }

        .dashboard-card {
          width: 100%;
          max-width: 800px;
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .dashboard-title {
          text-align: center;
          color: #4f46e5;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .dashboard-msg {
          color: #e11d48;
          text-align: center;
          margin-bottom: 1rem;
        }

        .dashboard-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dashboard-section {
          padding: 1rem;
          border-radius: 15px;
        }

        .user-info {
          background: #ede9fe;
          color: #4f46e5;
        }

        .protected-msg {
          background: #dcfce7;
          color: #166534;
        }

        .orders {
          background: #dbeafe;
          color: #1e40af;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.5rem;
        }

        th,
        td {
          padding: 0.75rem;
          border: 1px solid #cbd5e1;
          text-align: left;
        }

        th {
          background: #bfdbfe;
        }

        tr:hover {
          background: #eff6ff;
        }

        .logout-btn {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #4f46e5;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: #4338ca;
        }

        .loading-msg {
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
