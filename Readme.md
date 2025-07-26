# 👥 Live User Tracking Service

This is a standalone **WebSocket-based microservice** designed to track online users in real time across your web platform — ideal for features like **"X users online"** or **live presence indicators** (e.g., Omegle-style platforms).

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
- **Winston** (or any logger) for logging

---

## 📦 Installation
Not connected to github now will update as soon as possible
```bash
npm install