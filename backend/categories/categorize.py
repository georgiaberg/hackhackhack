# Experience/To-do/Relationship/Goal
from flask import request, jsonify
from flask_restful import Resource
import cohere

class CategorizeNotes(Resource):
    """Categorize notes using Cohere API.
       Notes are annotated with a field 'category'.
       These are: 'To-do', 'Experience', 'Relationship', 'Goal'
    """
    
    def post(self):
        notes = request.json['notes']

        # Placeholder for Cohere API call to categorize notes
        categorized_notes = {}  # Replace with Cohere API result

        return jsonify(categorized_notes)

