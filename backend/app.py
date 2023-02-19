
import flask
from flask import Flask
from flask import request
from flask_cors import CORS

import json
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv("dataset.csv").fillna("missing")

@app.route('/dataset.csv', methods=["GET"])
def dataset():
    print("dataset...")
    data = df.to_dict(orient='records')
    return json.dumps(data)[1:-1]

@app.route('/get_stats', methods=["PUT"])
def get_stats():
        print("getting stats...")
        body = request.get_json()
        print(body)
        query = '`Food product` == "{name}"'.format(name=body["name"])
        result = df.query(query)
        data = result.to_dict(orient='records')
        return '{"Food product": ""}' if result.shape[0] == 0 else json.dumps(data)[1:-1]

if __name__ == "__main__":
    app.run("localhost", 3000)