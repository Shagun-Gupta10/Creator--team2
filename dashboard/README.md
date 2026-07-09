# Creator Analytics Dashboard — Backend (Milestone 1, Week 1-2)

A working **FastAPI** backend implementing:
- JWT-based authentication (register/login)
- Role-based access control (`admin`, `creator`, `viewer`)
- Analytics data model + ingestion endpoints
- Aggregated analytics dashboard endpoints (per-creator, per-platform, admin-wide)

## Project structure

```
analytics_dashboard/
├── app/
│   ├── __init__.py
│   ├── database.py     # SQLAlchemy engine/session (SQLite by default)
│   ├── models.py        # User + AnalyticsEvent ORM models
│   ├── schemas.py        # Pydantic request/response schemas
│   ├── auth.py            # Password hashing, JWT, role-based dependencies
│   ├── analytics.py        # Aggregation logic (summaries, breakdowns)
│   └── main.py               # FastAPI app + all routes
├── seed_data.py                 # Creates demo users + sample analytics data
├── requirements.txt
└── README.md
```

## 1. Setup

```bash
cd analytics_dashboard
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Seed demo data (optional but recommended)

```bash
python seed_data.py
```

This creates:

| username       | password   | role    |
|----------------|-----------|---------|
| admin          | admin123  | admin   |
| alice_creates  | alice123  | creator |
| bob_vlogs      | bob123    | creator |

...and ~12 random analytics events per creator so the dashboard has data to show immediately.

## 3. Run the server

```bash
uvicorn app.main:app --reload
```

The API is now live at `http://127.0.0.1:8000`.
Interactive docs (Swagger UI): `http://127.0.0.1:8000/docs`

## 4. Try it out

**Login** (get a JWT token):
```bash
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice_creates&password=alice123"
```
Response:
```json
{"access_token": "eyJ...", "token_type": "bearer", "role": "creator", "username": "alice_creates"}
```

**Call a protected endpoint** using the token:
```bash
curl http://127.0.0.1:8000/dashboard/summary \
  -H "Authorization: Bearer eyJ..."
```

**Register a new user:**
```bash
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"carla","email":"carla@example.com","password":"secret123","role":"creator"}'
```

## Endpoint reference

| Method | Path                              | Access           | Description |
|--------|------------------------------------|------------------|--------------|
| POST   | `/auth/register`                   | public           | Create a new user |
| POST   | `/auth/login`                      | public           | Login, returns JWT |
| GET    | `/auth/me`                         | authenticated    | Current user's profile |
| GET    | `/users`                           | admin only       | List all users |
| POST   | `/analytics/events`                | admin, creator   | Log a new analytics event (views/likes/etc.) |
| GET    | `/analytics/events`                | authenticated    | List your own analytics events |
| GET    | `/dashboard/summary`               | authenticated    | Your aggregated totals + engagement rate |
| GET    | `/dashboard/platform-breakdown`    | authenticated    | Your totals grouped by platform |
| GET    | `/dashboard/creator/{creator_id}`  | self or admin    | View a specific creator's dashboard |
| GET    | `/dashboard/admin/overview`        | admin only       | Platform-wide totals across all creators |

## How role-based access control works

- Every protected route depends on `auth.get_current_user`, which decodes and validates the JWT.
- Routes restricted to specific roles use `auth.require_roles("admin")` or `auth.require_roles("admin", "creator")` as a dependency — this raises `403 Forbidden` if the caller's role isn't in the allowed list.
- Row-level protection: `/dashboard/creator/{creator_id}` lets a `creator` view **only their own** dashboard, while `admin` can view **any** creator's dashboard — this is checked in the route body, not just the role.

## Notes for production

- Replace the hardcoded `SECRET_KEY` fallback in `app/auth.py` with an environment variable (`DASHBOARD_SECRET_KEY`) — never ship the dev default.
- Swap SQLite for Postgres/MySQL by changing `SQLALCHEMY_DATABASE_URL` in `app/database.py`.
- Use Alembic for schema migrations instead of `Base.metadata.create_all`.
- Add refresh tokens / token revocation if you need logout-everywhere support.
- Connect a React frontend by calling these endpoints with `fetch`/`axios` and storing the JWT (e.g. in memory or an httpOnly cookie via a backend-for-frontend).
