import flask
from flask_login import LoginManager
login_manager = LoginManager()

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "Hello World"

app.run()