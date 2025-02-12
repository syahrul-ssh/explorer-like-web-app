## 🚀 Getting Started

### Prerequisites

Ensure you have **Bun** installed.

### 1️⃣ Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   bun install
   ```
3. Setup the database (if using Prisma):
   ```sh
   bun run prisma migrate dev
   ```
4. Start the backend server:
   ```sh
   bun run dev
   ```
   The backend should now run on `http://localhost:3000`.

### 2️⃣ Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   bun install
   ```
3. Start the frontend server:
   ```sh
   bun run dev
   ```
   The frontend should now be available at `http://localhost:5173`.

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder with the following:

```
DATABASE_URL=postgresql://user:password@localhost:5432/explorer_db
UPLOADS_DIR=uploads/
PORT=3000
```