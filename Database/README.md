# Database

MongoDB is the NIRVIVAAD database. Backend connection settings live in `Backend/.env`.

## Run locally

From this directory, start MongoDB with Docker:

```powershell
docker compose up -d
```

Then copy `Backend/.env.example` to `Backend/.env`, install backend dependencies, and start the API. Collections and indexes are created automatically when FastAPI starts. Optional sample data can be inserted with `python scripts/seed.py`.

Collections: `users`, `disputes`, `messages`, and immutable `audit_events`.

```text
Database/
  schemas/       collection shapes and indexes
  scripts/       seed and maintenance scripts
```

Do not commit exported data, credentials, or production dumps.
