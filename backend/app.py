from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from categories.categorize import CategorizeNotes
from summaries.summarize import SummarizeNotes

app = Flask(__name__)
api = Api(app)

api.add_resource(CategorizeNotes, '/api/categorize')
api.add_resource(SummarizeNotes, '/api/summarize')

if __name__ == '__main__':
    app.run(debug=True)
