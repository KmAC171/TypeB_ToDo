# TODO App — Backend

Express REST API connected to MongoDB Atlas.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description |
|---|---|
| PORT | Server port (default 5000) |
| MONGODB_URI | Your MongoDB Atlas connection string |
| CLIENT_URL | Frontend URL for CORS (default http://localhost:5173) |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/:id | Update title/description |
| PATCH | /api/todos/:id/done | Toggle done status |
| DELETE | /api/todos/:id | Delete a todo |

## Assumptions
- No authentication — single user scope
- Todos sorted newest first
- Title is required, description is optional