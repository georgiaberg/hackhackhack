import cohere
import streamlit as st

co = cohere.Client("pCuvBtCMTy7LNURTBjKmtx5pdzRADG8mqsnCNakx")


promt_string = """This program generates a startup idea given the industry.

Industry: Workplace
Startup Idea: A platform that generates slide deck contents automatically based on a given outline

--
Industry: Home Decor
Startup Idea: An app that calculates the best position of your indoor plants for your apartment

--
Industry: Healthcare
Startup Idea: A hearing aid for the elderly that automatically adjusts its levels and with a battery lasting a whole week

--
Industry: Education
Startup Idea: An online primary school that lets students mix and match their own curriculum based on their interests and goals

--
Industry:
"""

def generate_idea(industry):
    base_idea_prompt = promt_string
    response = co.generate(
        model='xlarge',
        prompt = base_idea_prompt + " " + industry + "\nStartup Idea: ",
        max_tokens=50,
        temperature=0.5,
        k=0,
        p=0.7,
        frequency_penalty=0.1,
        presence_penalty=0,
        stop_sequences=["--"])
    response = response.generations[0].text
    response = response.replace("\n\n--","").replace("\n--","").strip()
    return response


def generate_name(idea):
    base_name_prompt="< OUR FULL PROMPT STRING >"
    response = co.generate(
        model='xlarge',
        prompt = base_name_prompt + " " + idea + "\nStartup Name:",
        max_tokens=10,
        temperature=0.5,
        k=0,
        p=0.7,
        frequency_penalty=0,
        presence_penalty=0,
        stop_sequences=["--"])
    response = response.generations[0].text
    response = response.replace("\n\n--","").replace("\n--","").strip()
    return response

print(generate_idea("Tech"))
