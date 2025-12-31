# CodeArena 🚀

CodeArena is a **LeetCode-like online coding platform** built from scratch using **React, Node.js, Express, Docker, and Prisma**. It allows users to write, run, and submit code in multiple programming languages with real-time judging, execution limits, and submission history.

---

## ✨ Features

* 🧠 **Problem Solving Interface** (LeetCode-style UI)
* 🧪 **Multiple Test Cases Support**
* ⏱️ **Time Limit Enforcement (TLE detection)**
* 🐳 **Docker-based Code Execution** (JavaScript, Python, C, C++)
* 📜 **Submission History Tracking**
* 🧑‍💻 **Monaco Code Editor** (VS Code-like editor)
* 🌙 **Dark Mode UI**
* 🔐 **Environment-safe configuration**

---

## 🛠️ Tech Stack

### Frontend

* React + Vite
* Monaco Editor
* CSS (Custom LeetCode-style layout)

### Backend

* Node.js + Express
* Prisma ORM
* PostgreSQL
* Docker (for secure code execution)

---

## 📂 Project Structure

```
CodeArena/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── runners/
│   │   ├── index.js
│   ├── prisma/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Naveen4421/CodeArena.git
cd CodeArena
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill your `.env` file with:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/codearena
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---



## 📜 Submission Statuses

* ✅ Accepted
* ❌ Wrong Answer
* ⏱️ Time Limit Exceeded
* 💥 Runtime Error

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a Pull Request

> ⚠️ Never commit `.env` files

---

## 📌 Future Enhancements

* User authentication
* Problem list & categories
* Contest mode
* Code plagiarism detection
* Leaderboards

---

## 👨‍💻 Author

**Naveen S**
📧 Email: [naveen.siddappa44@gmail.com](mailto:naveen.siddappa44@gmail.com)
🌐 GitHub: [https://github.com/Naveen4421](https://github.com/Naveen4421)

---

⭐ If you like this project, give it a star!
