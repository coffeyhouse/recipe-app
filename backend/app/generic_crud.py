from flask import Blueprint
from .utils import get_all, get_by_id, create_record, update_record, delete_record
from . import db

def create_crud_blueprint(model, url_prefix):
    bp = Blueprint(model.__tablename__, __name__, url_prefix=url_prefix)

    @bp.route('/', methods=['GET'])
    def get_records():
        return get_all(model)

    @bp.route('/<int:id>', methods=['GET'])
    def get_record(id):
        return get_by_id(model, id)

    @bp.route('/', methods=['POST'])
    def create():
        return create_record(model)

    @bp.route('/<int:id>', methods=['PUT'])
    def update(id):
        return update_record(model, id)

    @bp.route('/<int:id>', methods=['DELETE'])
    def delete(id):
        return delete_record(model, id)

    return bp
