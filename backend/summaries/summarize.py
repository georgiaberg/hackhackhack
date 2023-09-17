from flask import request, jsonify
from flask_restful import Resource
import cohere
import re
co = cohere.Client("WV73TN52GyHJbEw0OGyqWjP8MMaGgOziFpog4wTQ")


def getSummary(notes_string, format='paragraph'):
    """Summarize an array of notes using Cohere's summarize API."""

    # Use Cohere API to summarize the notes
    response = co.summarize(
        text=notes_string,
        format=format,
        additional_command="in a third-person, reflection-inspiring tone"
    )
    summary = response.summary
    return summary

# categories to leverage: experience, to-do, relationship, goal
def getQuestions(notes_string, summary):
    """Generate reflective questions & exercises based on notes using Cohere's generate API."""
    prompt = f"""Based on the following notes themselves:\n
                {notes_string},
                what reflective questions or exercises can be asked?
                Please list no more than 3 reflective questions and 2 writing exercises.
                You must cite the title and date of the note that the variable is from at the end of your question or exercise.
                A variable can be one of the following:\n
                <date>: the date of the note\n
                <title>: the title of the note\n
                <person>: a person mentioned in the note\n
                <relationship>: a relationship mentioned in the note\n
                <experience>: an experience mentioned in the note\n
                <goal>: a goal mentioned in the note\n
                <to-do>: a to-do mentioned in the note\n
                <sentiment>: the sentiment for the note (positive, negative, neutral)\n
                Remember, any content within <> represents a variable
                that can be replaced with a word or phrase from a note and cited with the respective title and date.\n
                Here are some examples:\n
                Q: Why did you feel jealous about <person> in the note from <date>? (title, date) \n
                Q: Looking back, how would you handle <experience> differently? (title, date) \n
                Q: How do you feel about your progress towards <goal>? (title, date) \n
                W: Try to write a note about <relationship> from the perspective of <person>. (title, date) \n
                W: Rearrange your to-do list with a focus on <goal>. \n"""
    questions_response = co.generate(prompt=prompt, max_tokens=150)
    content = questions_response.generations[0].text
    # Split the text based on "|"
    split_text = content.split("\n")
    # filter '' and all strings not containing "Q: " or "W: "
    questions = [x for x in split_text if x != '' and ("Q: " in x or "W: " in x)]
    print(questions)
    return questions
   
class SummarizeNotes(Resource):
    """Summarize notes using Cohere API."""
    
    def post(self):
        notes = request.json['notes']
        notes_string = ""
        for note in notes:
            notes_string += note['title'] + "\n" + "Date:" + note['date'] + "\n" + note['content'] + "\n\n"
        format = request.json.get('format', 'paragraph')
        summary = getSummary(notes_string, format)
        questions = getQuestions(notes_string, summary)
        return jsonify({"summary": summary, "questions": questions})
