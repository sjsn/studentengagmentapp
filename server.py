from flask import Flask, render_template, request, jsonify
import requests, json
import time as _time
from secrets import emotions_key
import math

app = Flask(__name__)

ms_emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'

test_img = 'https://writechoice.files.wordpress.com/2012/03/lack-of-concentration.jpg'

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

#@app.route('/api/teacherLogIn', method = ['POST'])
#def teacherLogIn(): # pupulate database with array of student ids

# def getClassID(): # creates a unique class ID whenever it is called. Returns that ID as an integer
#     uniqueNumRaw = _time.time()
#     print("uniqueNumRaw: ", uniqueNumRaw)
#     uniqueNum = math.floor(10000*((uniqueNumRaw/10000)-math.floor(uniqueNumRaw/10000)))
#     return uniqueNum


# NO CLUE WHY getClassEngagement DOESN'T WORK

def getClassEngagement(students): # takes a list of students and returns a message indicating whether or not the class is engaged
    threshold = .5 # idk
    stateIndex = 3 # index containing student's state (CHECK THIS WITH SAM)
    totalDisengagement = 0 # initialize to zero
    numberOfStudents = len(students)

    for student in students: # aggregate the attentiveness level of all student
        studentDisengagement = students[student][stateIndex]
        totalDisengagement += studentDisengagement

    percentDisengaged = totalDisengagement/numberOfStudents
    disengaged = (percentDisengaged > threshold)

    if disengaged:
        result = {"teacherMessageText": "class is disengaged"}
    else:
        result = {"teacherMessageText": "class is engaged"}

    print(result['teacherMessageText'])

@app.route('/api/analyze', methods=['POST'])
def getEmotions(): # determine the emotion scores, given an image of 1 person's face
    if request.form.get('img_url', type=str) is not None:
        # test_img = request.form.get('img_url', type=str)
        params = {
            "url": test_img # using bullshit image. Not real one.
        }
        headers = {}
        headers['Ocp-Apim-Subscription-Key'] = emotions_key
        headers['Content-Type'] = 'application/json'
        response = requests.request('POST', ms_emotion_url, json=params, data=None, headers=headers, params=None)
        result = response.json()
        result = getInattentive(result);
        return jsonify(result)
    else:
        return jsonify({"error": 1})

def getInattentive(emotion_list): # returns a boolean indicating innatention (True means student is disengaged)
    threshold = .7 # if negative emotions exceed this, student is disengaged
    if 'neutral' in emotion_list[0]['scores']:
        del emotion_list[0]['scores']["neutral"] # delete the "neutral" key-value pairing
    pretty = json.dumps(emotion_list, sort_keys=True, indent=4, separators=(',', ':'))

    listTotal = 0 # initialize to zero for totaling
    negativeEmotionTotal = 0;

    for str in {"anger", "contempt", "disgust", "fear", "happiness", "sadness", "surprise"}: # add up the remaining values
        temp = emotion_list[0]['scores'][str]
        listTotal += temp # compute a new total

        if str in {"anger", "contempt", "disgust", "fear", "sadness"}: # negative emotions are also summed
            negativeEmotionTotal += emotion_list[0]['scores'][str]

    result = negativeEmotionTotal / listTotal # student's disengagement level (higher numbers indicate increased disengagement)

    if (result < threshold):
        print("You are attentive")
    else:
        print("You are inattentive")

    return (result < threshold)

if __name__ == '__main__':
    app.run()
