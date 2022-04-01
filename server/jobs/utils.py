from functools import wraps
from google.oauth2 import id_token
from google.auth.transport import requests
from flask import request, jsonify, g

from server.settings import *


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if DEBUG_NO_AUTH_ENABLED:
            g.user = "NO_AUTH_ENABLED"
            return f(*args, **kwargs)
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[-1].strip()

        if token is None:
            return jsonify(
                message="Unauthorized: Missing Token"
            ), 401

        try:
            id_info = id_token.verify_oauth2_token(
                token, requests.Request(), GOOGLE_OAUTH_CLIENT_URL
            )
            g.user = id_info["email"]
            return f(*args, **kwargs)
        except ValueError:
            return jsonify(
                message="Unauthorized: Invalid Token"
            ), 401

    return decorator
