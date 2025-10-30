Next-Nest JWT Auth Demo (MongoDB Atlas)
======================================

What you have:
- frontend-next : Next.js App Router (app/* files)
- backend-nest  : NestJS minimal backend using MongoDB Atlas + JWT auth

Important: This is a small demo designed for learning and interviews.
- Passwords are hashed with bcrypt on backend.
- Tokens are simple JWTs (1h expiry) issued by backend.
- For demo simplicity token is stored in localStorage in frontend. In production use httpOnly cookies.

Setup (MongoDB Atlas)
1. Create a MongoDB Atlas cluster and a database user.
2. Get the connection string, e.g.:
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/sso_demo
3. Copy backend-nest/.env.example to backend-nest/.env and replace <username> and <password>.

Run backend:
---------------
cd backend-nest
cp .env.example .env   # then edit .env and put your Atlas credentials
npm install
npm run start:dev

Run frontend:
---------------
cd frontend-next
npm install
npm run dev

Test flow:
1. Open http://localhost:3000/register  -> create a user
2. Open http://localhost:3000/login     -> login and store token
3. Open http://localhost:3000/dashboard -> frontend calls backend /protected with token

Notes:
- Keep JWT_SECRET secret in production and use HTTPS.
- This demo uses mongodb driver directly for simplicity.
