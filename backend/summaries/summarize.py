from flask import request, jsonify
from flask_restful import Resource
import cohere
import re
from datetime import datetime

co = cohere.Client("WV73TN52GyHJbEw0OGyqWjP8MMaGgOziFpog4wTQ")


def getSummary(notes_string, format="paragraph"):
    """Summarize an array of notes using Cohere's summarize API."""

    # Use Cohere API to summarize the notes. If they are too short, use the generate API instead.
    try:
        response = co.generate(
            prompt=f"Summarize the following journal entries in a second-person, reflection-inspiring tone:{notes_string}",
            max_tokens=250,
            temperature=0.3,
        )
        summary = response.generations[0].text.strip()
    except:
        response = co.summarize(
            text=notes_string,
            format=format,
            additional_command="in a second-person, reflection-inspiring tone",
        )
        summary = response.summary
    return summary


# categories to leverage: experience, to-do, relationship, goal
def getQuestions(notes_string):
    """Generate reflective questions & exercises based on notes using Cohere's generate API."""
    prompt = f"""Based on the following notes :\n
                {notes_string},
                what reflective questions or exercises can be asked?
                Please come up with no more than 5 creative reflective questions writing exercises.
                You must cite the title and date of the note relating to your question or exercise.
                Here are some examples, follow this format and don't output anything extra. \n
                1. Why did you feel jealous about <person> in the note from <date>? (title, date) \n
                2: Looking back, how would you handle <experience> differently? (title, date) \n
                3: How do you feel about your progress towards <goal>? (title, date) \n
                4: Try to write a note about <relationship> from the perspective of <person>. (title, date) \n
                5: Rearrange your to-do list with a focus on <goal>. \n"""
    questions_response = co.generate(prompt=prompt, max_tokens=200, temperature=0.0)
    content = questions_response.generations[0].text

    split_text = content.split("\n")
    # remove the numbers from each question
    split_text = [re.sub(r"^\d+\.", "", q.strip()) for q in split_text]
    questions = [q.strip() for q in split_text]
    return questions


class SummarizeNotes(Resource):
    """Summarize notes using Cohere API."""

    def post(self):
        notes = request.json["notes"]
        notes_string = ""

        for note in notes:
            # date is in UTC format so we need to convert it to a more readable format
            # date_object = datetime.strptime(note["date"], "%Y-%m-%dT%H:%M:%S.%fZ")
            # formatted_date = date_object.strftime("%B %d")  # Converts to "Month Day"
            # + "Date:" + formatted_date + "\n"
            notes_string += note["title"] + "\n"
            try:
                notes_string += "Sentiment:" + note["sentiment"] + "\n"
                notes_string += "Types:" + ",".join(note["types"]) + "\n"
            except:
                pass
            finally:
                notes_string += note["content"] + "\n"

        format = request.json.get("format", "paragraph")
        summary = getSummary(notes_string, format)
        questions = getQuestions(notes_string)
        return jsonify({"summary": summary, "questions": questions})
