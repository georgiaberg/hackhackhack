from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS  # Import the CORS package
import psycopg2
import os
from dotenv import load_dotenv
from contextlib import closing

from categories.categorize import catty
from summaries.summarize import SummarizeNotes


app = Flask(__name__)
CORS(app)
api = Api(app)
# set env variables
load_dotenv()
# Load environment variables from .env file
DATABASE_URL = os.environ['DATABASE_URL']

def connect_to_cockroachdb():
    return psycopg2.connect(DATABASE_URL)

def execute_query(query, params):
    with closing(connect_to_cockroachdb()) as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)
            conn.commit()


@app.route('/add_note', methods=['POST'])
def add_note():
    try:
        note_data = request.json
        title = note_data['title']
        content = note_data['content']
        date = note_data['date']
        categorized_note = catty(note_data["content"])
        sentiment = categorized_note['sentiment']
        types = categorized_note['types']
        
        with closing(connect_to_cockroachdb()) as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO notes (title, content, date, sentiment, types) VALUES (%s, %s, %s, %s, %s) RETURNING id", 
                            (title, content, date, sentiment, types))
                note_id = cur.fetchone()[0]
                conn.commit()
        
        return jsonify({"message": "Note added successfully", "note_id": note_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    
@app.route('/edit_note', methods=['POST'])
def edit_note():
    try:
        note_data = request.json
        id = note_data['id']
        title = note_data['title']
        content = note_data['content']
        date = note_data['date']

        # Categorize the note
        categorized_note = catty(note_data)
        sentiment = categorized_note['sentiment']
        types = categorized_note['types']

        # Update the note in the database
        query = """UPDATE notes 
                   SET title = %s, content = %s, date = %s, sentiment = %s, types = %s 
                   WHERE id = %s"""
        execute_query(query, (title, content, date, sentiment, types, id))

        return jsonify({"message": "Note edited successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    
@app.route('/delete_note', methods=['POST'])
def delete_note():
    try:
        note_data = request.json
        id = note_data['id']
        
        query = "DELETE FROM notes WHERE id = %s"
        execute_query(query, (id,))
        
        return jsonify({"message": "Note deleted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/clear_notes', methods=['POST'])
def clear_notes():
    try:
        query = "DELETE FROM notes"
        execute_query(query, ())
        
        return jsonify({"message": "Notes cleared successfully"}), 201

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

        notes = [{"id": row[0], "title": row[1], "content": row[2],
                  "date": row[3], "sentiment": row[4], "types": row[5]} for row in result]
        return jsonify({"notes": notes}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

api.add_resource(SummarizeNotes, '/api/summarize')


if __name__ == '__main__':
    app.run(debug=True)
