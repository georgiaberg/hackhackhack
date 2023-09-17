from flask import request, jsonify
from flask_restful import Resource
import cohere
import re
co = cohere.Client("vJiw0lqrJcxeJD81oH4kk5QwmnxNyMKxn5pizF7K")


def getSummary(notes, format):
    """Summarize an array of notes using Cohere's summarize API."""
    notes_string = ""
    for note in notes:
        notes_string += note['title'] + ", " + note['date'] + "\n" + note['content'] + "\n\n"

    # Use Cohere API to summarize the notes
    response = co.summarize(
        text=notes_string,
        # model='command',
        # length='medium',
        # extractiveness='medium',
        format=format
    )
    summary = response.summary
    return summary

# categories to leverage: experience, to-do, relationship, goal
def getQuestions(notes, summary):
    """Generate reflective questions & exercises based on a summary using Cohere's generate API."""
    prompt = f"""Based on the summary: {summary}, what reflective questions or exercises can be asked?
                Please list 2-4 questions and 1-3 writing exercises below in the format:
                Q: Why did you feel <sentiment> about <person> in the note from <date>?
                Q: Looking back, how would you handle <experience> differently?
                Q: How do you feel about your progress towards <goal>?
                W: Try to write a note about <relationship> from the perspective of <other person in relationship>.
                W: Brainstorm as many words as you can that describe <person in note>."""
    questions_response = co.generate(prompt=prompt, max_tokens=50)
    # parse the questions and writing exercises by splitting on the "Q:" and "W:" prompts
    questions = re.split("Q:|W:", questions_response['text'])
    # remove empty strings
    questions = list(filter(None, questions))
    print(questions)
    return questions
   
class SummarizeNotes(Resource):
    """Summarize notes using Cohere API."""
    
    def post(self):
        notes = request.json['notes']
        format = request.json.get('format', 'paragraph')  # Default to 'paragraph' if not specified
        summary = getSummary(notes, format)
        questions = getQuestions(summary)
        return jsonify({"summary": summary, "questions": questions})


