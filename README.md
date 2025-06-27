# 🛠️ Job Tracker App – Backend

This is the backend server of the Job Tracker App built with Node.js, Express, and MongoDB.

---

## 🔧 What This Server Does

- Handles **user registration and login** with JWT auth
- Lets users **create, read, update, and delete** job applications
- Protects routes using authentication middleware

---

## 📁 Folder Structure

backend/
├── config/ # Database connection
│ └── db.js
├── controllers/ # Logic for auth and jobs
│ ├── authController.js
│ └── jobController.js
├── middleware/ # JWT auth middleware
│ └── authMiddleware.js
├── models/ # Mongoose schemas
│ ├── User.js
│ └── Job.js
├── routes/ # API routes
│ ├── authRoutes.js
│ └── jobRoutes.js
├── .env # Secrets and DB URI
├── server.js # Entry point
└── package.json


## ▶️ How to Run Backend Locally

### 1. Install dependencies

```bash
npm install
2. Create .env file in backend/
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
3) run nodemon server.js
If set up properly, you’ll see:
🚀 Server running on http://localhost:5000
Connection Established

# 🌐 Job Tracker App – Frontend

This is the frontend for the Job Tracker App, built using **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 What This Frontend Does

- Lets users **register, log in, and manage** their job applications
- Uses **JWT token** stored in `localStorage` for authentication
- Allows users to **create, edit, and delete jobs**
- Uses `react-hot-toast` for showing success and error messages
- Styled fully with **Tailwind CSS**

---

## 📁 Folder Structure

frontend/
├── public/ # Static files
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Dashboard.jsx
│ ├── utils/
│ │ └── axios.js # Axios base config with baseURL
│ ├── App.jsx # Routes setup
│ └── main.jsx # Entry point
├── .env
├── vite.config.js
├── package.json
└── tailwind.config.js

## ▶️ How to Run Frontend Locally

### 1. Go to the frontend folder

```bash
cd frontend
2. Install dependencies
npm install
3. Start the dev server
npm run dev
Now open: http://localhost:5173
