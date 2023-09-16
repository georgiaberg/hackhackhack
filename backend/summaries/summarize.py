from flask import request, jsonify
from flask_restful import Resource
import cohere
co = cohere.Client("pCuvBtCMTy7LNURTBjKmtx5pdzRADG8mqsnCNakx")

class SummarizeNotes(Resource):
    """Summarize notes using Cohere API.
    """
    
    def post(self):
        notes = request.json['notes']

        # Placeholder for Cohere API call to co.summarize()
        # first, we want to make one document in the form
        # Note 1 title, date
        # Note 1 content
        # Note 2 title, date'
        # Note 2 content
        # ...
        notes_string = ""
        for note in notes:
            notes_string += note['title'] + ", " + note['date'] + "\n" + note['content'] + "\n\n"

        summary = ""  # Replace with Cohere API result

        return jsonify(summary=summary)

