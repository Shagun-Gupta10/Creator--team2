from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR.parent / "creatoriq.db"
DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def ensure_content_columns():
    with engine.begin() as conn:
        rows = conn.execute(text("PRAGMA table_info(content)")).fetchall()
        existing_columns = {row[1] for row in rows}

        if 'comments' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN comments INTEGER DEFAULT 0"))
        if 'shares' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN shares INTEGER DEFAULT 0"))
        if 'saves' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN saves INTEGER DEFAULT 0"))
        if 'watch_time' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN watch_time FLOAT DEFAULT 0"))
        if 'reach' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN reach INTEGER DEFAULT 0"))
        if 'engagement_rate' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN engagement_rate FLOAT DEFAULT 0"))
        if 'created_at' not in existing_columns:
            conn.execute(text("ALTER TABLE content ADD COLUMN created_at DATETIME"))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from app.models.post import InstagramPost
Base.metadata.create_all(bind=engine)
ensure_content_columns()
