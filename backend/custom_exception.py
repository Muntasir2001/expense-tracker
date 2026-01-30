from typing import Union

class CustomHttpException(Exception):
    def __init__(self, status_code:int, title: Union[str, dict]):
        self.status_code = status_code
        self.title = title