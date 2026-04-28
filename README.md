# TODO App

A full-stack TODO application built with React, Express, and MongoDB.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/hiring-fullstack-todo
cd hiring-fullstack-todo
```

### 2. Run the backend
```bash
cd server
npm install
cp .env.example .env   # add your MongoDB URI
npm run dev
```

### 3. Run the frontend
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features
- View all TODOs
- Create a TODO with title and optional description
- Edit a TODO
- Mark as done / undone
- Delete a TODO