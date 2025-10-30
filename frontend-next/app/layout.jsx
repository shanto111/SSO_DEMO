"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f8fa;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            color: #333;
          }

          nav {
            background-color: #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            padding: 12px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2563eb;
          }

          .links a, .links button {
            margin-left: 15px;
            text-decoration: none;
            font-weight: 500;
            color: #555;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.95rem;
            transition: color 0.3s;
          }

          .links a:hover, .links button:hover {
            color: #2563eb;
          }

          main {
            flex: 1;
            max-width: 800px;
            margin: 40px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.05);
            padding: 30px;
          }

          footer {
            text-align: center;
            padding: 15px 0;
            font-size: 0.9rem;
            color: #666;
            background-color: #fff;
            border-top: 1px solid #e5e7eb;
          }

          @media (max-width: 700px) {
            nav {
              flex-direction: column;
              gap: 8px;
            }

            .links a, .links button {
              margin: 0 8px;
            }

            main {
              margin: 20px;
              padding: 20px;
            }
          }
        `}</style>
      </head>

      <body>
        <nav>
          <div className="logo">SSO-based authentication</div>
          <div className="links">
            <Link href="/">Home</Link>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/reports">Reports</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </div>
        </nav>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()} SSO-based authentication Demo
        </footer>
      </body>
    </html>
  );
}
