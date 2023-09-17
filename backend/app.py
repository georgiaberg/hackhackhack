from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS  # Import the CORS package
import psycopg2
import os
from dotenv import load_dotenv

from categories.categorize import CategorizeNotes
from summaries.summarize import SummarizeNotes



app = Flask(__name__)
CORS(app)
api = Api(app)
# set env variables
load_dotenv()
# Load environment variables from .env file
DATABASE_URL = os.environ['DATABASE_URL']
print (DATABASE_URL)
def connect_to_cockroachdb():
    return psycopg2.connect(DATABASE_URL)

@app.route('/add_note', methods=['POST'])
def add_note():
    try:
        note_data = request.json
        title = note_data['title']
        content = note_data['content']
        date = note_data['date']

        conn = connect_to_cockroachdb()
        cur = conn.cursor()
        cur.execute("INSERT INTO notes (title, content, date) VALUES (%s, %s, %s)", (title, content, date))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Note added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/get_notes', methods=['GET'])
def get_notes():
    try:
        conn = connect_to_cockroachdb()
        cur = conn.cursor()
        cur.execute("SELECT * FROM notes")
        result = cur.fetchall()
        cur.close()
        conn.close()

        notes = [{"id": row[0], "title": row[1], "content": row[2], "date": row[3], "sentiment": row[4], "types": row[5]} for row in result]
        return jsonify({"notes": notes}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

api.add_resource(CategorizeNotes, '/api/categorize')
api.add_resource(SummarizeNotes, '/api/summarize')


if __name__ == '__main__':
    app.run(debug=True)

