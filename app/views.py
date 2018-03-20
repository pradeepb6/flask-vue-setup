from flask import render_template, make_response

from . import app


@app.route('/')
def hello_world():
    resp = make_response(render_template('index.html'))
    return resp

