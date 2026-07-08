# CreatorIQ

## Overview

CreatorIQ is a content analytics platform that helps creators manage content and analyze engagement.

---

## Tech Stack

- FastAPI
- Python
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (bcrypt)

---

## Features

### Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected APIs

### Content Management
- Add Content
- View Content
- Delete Content

### Dashboard
- Total Posts
- Total Views
- Total Likes
- Engagement Rate

---

## Project Structure

backend/
├── app/
│   ├── auth/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── database.py
│   └── main.py

---

## API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | /register |
| POST | /login |
| POST | /token |
| GET | /profile |
| POST | /content |
| GET | /content |
| DELETE | /content/{id} |
| GET | /dashboard |

---

## Team

Backend Lead:
- Chandan

Frontend Lead:
- Pallavi

Database Lead:
- Sandeep

Dashboard and Analytics Lead:
- Sabarmathi


