import logging
from enum import Enum

import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class WhereisUserArg(Enum):
    """
    Enum for whereis_user_arg.
    """
    QUERY = 'query'
    JSON = 'json'
    FORM = 'form'


class FetchUserArg(BaseModel):
    fetch_from: WhereisUserArg
    required: bool = False


def search_data(search_query, api_key, search_engine_id, num_results):
    url = 'https://www.googleapis.com/customsearch/v1'
    logger.info(f"Query:{search_query}")
    params = {'key': api_key, 'cx': search_engine_id, 'q': search_query, 'num': num_results}

    response = requests.get(url, params=params)

    if response.status_code == 200:
        results = response.json()
        return results.get('items', [])
    else:
        print(f"Error: {response.status_code}")
        return []


def get_first_page_content(data_input):
    if type(data_input) is list:
        url = data_input[0]['link']
        response = requests.get(url)
    else:
        raise
    soup = BeautifulSoup(response.content, 'html.parser')

    text_content = soup.get_text()

    data_searched = text_content.strip().replace('\n', '')
    return data_searched
