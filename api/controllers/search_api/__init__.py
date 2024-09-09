from flask import Blueprint

from libs.external_api import ExternalApi

bp = Blueprint('search_api', __name__, url_prefix='/search/api')
api = ExternalApi(bp)


from .app import app, search