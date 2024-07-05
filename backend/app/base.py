from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TimestampMixin(object):
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)
    UpdatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
