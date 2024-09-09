import os
import logging

from flask import request
from flask_restful import Resource

from controllers.search_api import api
from controllers.search_api.wraps import search_data, get_first_page_content


logger = logging.getLogger(__name__)


class SearchInternet(Resource):
    def get(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        search_engine_id = os.getenv("SEARCH_ENGINE_ID")
        query = request.args.get('query', '')
        result = search_data(search_query=query, api_key=api_key, search_engine_id=search_engine_id, num_results=6)
        data_searched = get_first_page_content(result)
        return data_searched


api.add_resource(SearchInternet, '/search_info')