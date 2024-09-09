import logging

from flask import request
from flask_restful import Resource

from controllers.search_api import api
from controllers.search_api.wraps import search_data, get_first_page_content


logger = logging.getLogger(__name__)


class SearchInternet(Resource):
    def get(self):
        # API_KEY = dify_config.GOOGLE_SEARCH_API_KEY
        # SEARCH_ENGINE_ID = dify_config.SEARCH_ENGINE_ID
        API_KEY = 'AIzaSyBMW6O-ZSAWdeMEnZSXa5q-QZd8UapHci4'
        SEARCH_ENGINE_ID = 'c74ab7df6d9754983'

        query = request.args.get('query', '')
        result = search_data(search_query=query, api_key=API_KEY, search_engine_id=SEARCH_ENGINE_ID, num_results=6)
        data_searched = get_first_page_content(result)
        return data_searched


api.add_resource(SearchInternet, '/search_info')