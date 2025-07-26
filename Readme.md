# 👥 Live User Tracking Service

This is a standalone **WebSocket-based microservice** designed to track online users in real time across your web platform — ideal for features like **"X users online"** or **live presence indicators** (e.g., Omegle-style platforms). This is being used in COZIL, one of application I have createad.

---

## 🚀 Features

- Real-time tracking of online users.
- Broadcasts the total number of connected users.
- Assigns persistent user IDs using `localStorage`.
- Works independently as a microservice (runs on a separate port).
- Easily pluggable into any frontend via `socket.io-client`.

---

## 🧱 Tech Stack

- **Node.js** with **Express**
- **Socket.IO** for WebSocket communication
- **UUID** for generating user IDs
- **CORS** and **Helmet** for security
- **Pino** for logging

---

### 1. Clone the Repository

```bash
git clone https://github.com/theshantanusingh/cozil-live-user-tracker
cd cozil-live-user-tracker
```

### 2. Install Dependencies

Ensure Node.js and npm are installed, then run:

```bash
npm install
```

### 3. Build Tailwind CSS

```bash
npm run build
```

This will generate the CSS at `./src/output.css`.

### 4. Start the Server

```bash
npm start
```