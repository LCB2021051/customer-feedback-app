1. **Install backend dependencies** and start server:

```bash
cd backend
npm install
node server.js
# or
# nodemon server.js
```

2. **Install frontend dependencies** and start React:
   ```bash
   cd frontend
   npm install
   npm start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to see the login page.
4. Clicking **Login with Google** triggers the OAuth flow and obtains a token, allowing the user to submit or view feedback.

---

## 2. Environment Variables

Create a **`.env`** file in the **backend** folder:

```
PORT=5000
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
JWT_SECRET=YOUR_JWT_SECRET
FRILL_API_KEY=YOUR_FRILL_API_KEY
FRILL_BOARD_ID=YOUR_OPTIONAL_BOARD_ID
```

These values must match your Google Cloud Console app and Frill account credentials.

---

## 3. Project Overview

This application lets users:

- **Log in with Google** (via OAuth).
- Obtain a **JWT** token for accessing **protected routes** (submit/view feedback).
- Store feedback both **locally** (in-memory) and on **Frill.co**.
- Retrieve merged feedback from **local** + **Frill** data.

The **backend** is stateless—once the user logs in through Google, it issues a **JWT**. The frontend stores that token in `localStorage` and sends it in the **Authorization** header for protected requests.

---

## 4. Backend

### Base URL

```
http://localhost:5000/api/feedback
```

(assuming the server runs on port 5000).

### Endpoints

1. **GET /auth/google**

   - Starts Google OAuth flow.

2. **GET /auth/google/callback**

   - Completes OAuth, issues **JWT**, and redirects to `?token=XYZ`.

3. **GET /me** (Protected)

   - Requires `Authorization: Bearer <token>`.
   - Returns decoded token (Google profile).

4. **POST /submit** (Protected)

   - Requires `Authorization: Bearer <token>`.
   - Body: `{ category, rating, comment }`.
   - Saves feedback locally and attempts saving on **Frill**.

5. **GET /all** (Protected)
   - Requires `Authorization: Bearer <token>`.
   - Retrieves combined local + **Frill** data.

---

## 5. Frill Integration

- **Frill API**: `https://api.frill.co/v1/ideas`
- **Auth**: `Authorization: Bearer <FRILL_API_KEY>`
- **Workflow**:
  1. Submit feedback with `POST /ideas` (title, body, optional board).
  2. Fetch feedback with `GET /ideas`.
- If Frill fails, the backend falls back to **local** storage.

---

## 6. Frontend

### Routes

- **"/"**: Login page (public).
- **"/feedback"**: Feedback form (protected).
- **"/dashboard"**: Displays merged feedback (protected).
- **"/profile"**: Shows user’s Google profile (protected).

### JWT Flow

- On successful Google login, the server appends `?token=XYZ`.
- The frontend stores `authToken` in localStorage.
- All **protected** requests include:

  ```
  Authorization: Bearer <token>
  ```

- Logout removes `authToken`, effectively signing out.

---

## 7. Local Fallback Storage

- The backend uses an **in-memory** array to store feedback if Frill fails.
- Data resets on server restarts (demo only).
- For production, replace with a real database.

---

## 8. Flow Summary

1. **User** visits `"/"` (Login).
2. **Clicks** “Login with Google” → calls **`/auth/google`**.
3. **Google** prompts user; on success → calls **`/auth/google/callback`** → returns JWT.
4. **Frontend** saves `token` → can now call protected routes (`/submit`, `/all`).
5. **Logout** removes `token`, revoking access to protected pages.

---

## 9. Best Practices & Next Steps

1. **HTTPS**: Use HTTPS in production to protect tokens.
2. **Database**: Replace in-memory storage with persistent DB.
3. **Token Expiry**: Consider refresh tokens or shorter token lifespans.
4. **Deployment**:
   - Deploy backend (e.g., Heroku, Render).
   - Deploy frontend (Netlify, Vercel).
   - Configure environment variables accordingly.

With this setup, you have a **secure, modern** stateless system using **Google OAuth**, **JWT** for protected routes, and **Frill** for feedback management!

```

```
