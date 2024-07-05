from flask import request, jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from .extensions import db
from .models import User
from datetime import datetime

def get_all(model):
    try:
        records = model.query.all()
        return jsonify([record.to_dict() for record in records]), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

def get_by_id(model, id):
    try:
        record = model.query.get_or_404(id)
        return jsonify(record.to_dict()), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

def create_record(model):
    try:
        data = request.get_json()
        if issubclass(model, TimestampMixin):
            if 'CreatedAt' not in data:
                data['CreatedAt'] = datetime.utcnow()
            if 'UpdatedAt' not in data:
                data['UpdatedAt'] = datetime.utcnow()

        if model == User:
            password = data.pop('Password')
            user = model(**data)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            return jsonify(user.to_dict()), 201
        else:
            record = model(**data)
            db.session.add(record)
            db.session.commit()
            return jsonify(record.to_dict()), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'A record with that unique value already exists.'}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def update_record(model, id):
    try:
        data = request.get_json()
        record = model.query.get_or_404(id)
        for key, value in data.items():
            setattr(record, key, value)
        if issubclass(model, TimestampMixin):
            record.UpdatedAt = datetime.utcnow()
        db.session.commit()
        return jsonify(record.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def delete_record(model, id):
    try:
        record = model.query.get_or_404(id)
        db.session.delete(record)
        db.session.commit()
        return '', 204
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
