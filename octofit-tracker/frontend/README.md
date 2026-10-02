# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

When running in Codespaces, define `VITE_CODESPACE_NAME` so the frontend can reach the backend API through the forwarded `8000` port.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is unset, the frontend falls back to `http://localhost:8000`.

The app requests:

- `/api/activities/`
- `/api/leaderboard/`
- `/api/teams/`
- `/api/users/`
- `/api/workouts/`
