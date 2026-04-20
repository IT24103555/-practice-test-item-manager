# MERN Item Manager

Simple MERN item manager with CRUD operations and extra fields:
- `price`
- `category`

## Project Structure
- `backend` - Express + MongoDB API
- `frontend` - React app

## Local Run

### 1) Backend
1. Open terminal in `backend`
2. Install dependencies:
   - `npm.cmd install`
3. Set environment values in `backend/.env`:
   - `MONGO_URI=your_mongodb_uri`
   - `PORT=5001`
   - `CLIENT_URL=http://localhost:3000`
4. Start backend:
   - `npm.cmd run dev`

### 2) Frontend
1. Open terminal in `frontend`
2. Install dependencies:
   - `npm.cmd install`
3. Create `frontend/.env` from `frontend/.env.example` and set:
   - `REACT_APP_API_URL=http://localhost:5001`
4. Start frontend:
   - `npm.cmd start`

## API Endpoints
- `GET /api/items`
- `POST /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`

## Deploy (Free Hosting)

Deployment helper files are included at project root:
- `render.yaml` for backend service settings
- `netlify.toml` for frontend build settings

### Backend on Render
1. Push this project to a public GitHub repository.
2. On Render, create a new **Web Service** from repo.
3. Service settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `MONGO_URI`
   - `PORT` (optional on Render)
   - `CLIENT_URL` (set this after frontend deploy URL is known)
5. Deploy and copy backend URL, for example:
   - `https://your-backend.onrender.com`

### Frontend on Netlify
1. Create a new site from the same repo.
2. Site settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`
3. Set environment variable:
   - `REACT_APP_API_URL=https://your-backend.onrender.com`
4. Deploy and copy frontend URL.
5. Update backend `CLIENT_URL` on Render with this frontend URL.

## Git Commands
Run from project root:

```bash
git init
git add .
git commit -m "Complete MERN item manager"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Notes
- If PowerShell blocks `npm` or `npx`, use `npm.cmd` / `npx.cmd`.
- The accidental folder `backend/frontend` was created during earlier CRA attempt and can be removed if not needed.
