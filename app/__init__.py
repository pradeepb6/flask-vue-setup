from flask import Flask, send_from_directory
from flask_mail import Mail


app = Flask(__name__, static_folder=None)

app.config.from_pyfile('../config.py')
mail = Mail(app)


if __name__ == '__main__':
    app.run()


@app.route('/static/<path:filename>', methods=['GET'])
def static(filename, **kwargs):
    return send_from_directory(app.config['STATIC_PATH'], filename)


from app import views
