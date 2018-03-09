from flask import render_template, make_response

from alkaweb import app


@app.route('/')
def hello_world():
    resp = make_response(render_template('index.html'))
    return resp


@app.route('/mail')
def mail_send():
    return 'Mail sent'
