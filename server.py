from flask import Flask, render_template, request, jsonify
import requests, json
import time as _time
from secret import emotions_key
import math

app = Flask(__name__)

ms_emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'

test_img = 'http://legacy.lincolninteractive.org/images/default-album/bored-with-school-(via-salon.com).jpg?sfvrsn=2'
#'https://larrycuban.files.wordpress.com/2015/11/enhanced-buzz-wide-4644-1444018953-9.jpg'


@app.route('/api/question', methods=['GET'])
def main():
    if request.form['query'] is not None:
        query = request.form['query']
        answer = get(query)
        result = {"query": query, "answer": answer}
    return jsonify(result)


''' THIS STUFF IS USELESS APPARENTLY
>>>>>>> 12952c6c7f7b5f0792f65dad5db5cd8c53eaa8aa
@app.route('/api/createClassroom', methods=['POST'])
def createClassroom():
    if request.form['teacherID'] is not None and request.form['students'] is not None:
        createClassroom = request.form['classID']
        numbers = getClassID()
        result = {"classID": classID, "numbers": numbers}
    return jsonify(result)

@app.route('/api/studentLogIn', methods = ['POST'])
def studentLogIn():

@app.route('/api/teacherLogIn', method = ['POST'])
def teacherLogIn():
'''

#@app.route('/api/teacherLogIn', method = ['POST'])
#def teacherLogIn(): # pupulate database with array of student ids




def getClassID():
    uniqueNumRaw = _time.time()
    print("uniqueNumRaw: ", uniqueNumRaw)
    uniqueNum = math.floor(10000*((uniqueNumRaw/10000)-math.floor(uniqueNumRaw/10000)))
    print("uniqueNum: ", uniqueNum)


''' NO IDEA WHY THIS DOESN'T WORK
def getClassEngagement(students):
    threshold = .5 # idk
    stateIndex = 3 # index containing student's state (CHECK THIS WITH SAM)
    totalDisengagement = 0
    numberOfStudents = len(students)

    for student in students:
        studentDisengagement = students[student][stateIndex]
        totalDisengagement += studentDisengagement

    percentDisengaged = totalDisengagement/numberOfStudents
    disengaged = (percentDisengaged > threshold)

    if disengaged:
        result = ({"teacher message text": "class is disengaged"})
    else:
        result = ({"teacher message text": "class is engaged"})

    return jsonify(result)
'''

def getEmotions():
    params = {
        "url": test_img
    }
    headers = {}
    headers['Ocp-Apim-Subscription-Key'] = emotions_key
    headers['Content-Type'] = 'application/json'
    data = None
    response = requests.request('POST', ms_emotion_url, json=params, data=None, headers=headers, params=None)
    emotion_list = response.json()

    pretty = json.dumps(response.json(), sort_keys=True, indent=4, separators=(',', ':'))
    print(emotion_list)
    print (pretty)

    return emotion_list

def getInattentive(emotion_list): # returns a boolean indicating innatention (True means student is disengaged)
    threshold = .5 # negative emotion summation above this indicates innatention
    del emotion_list[0]['scores']["neutral"] # delete the "neutral" key-value pairing

    listTotal = 0
    negativeEmotionTotal = 0;

    for str in {"anger", "contempt", "disgust", "fear", "happiness", "sadness", "surprise"}: # add up the remaining values
        temp = emotion_list[0]['scores'][str]
        listTotal += temp # compute a new total

        if str in {"anger", "contempt", "disgust", "fear", "sadness"}: # negative emotions are summed
            negativeEmotionTotal += emotion_list[0]['scores'][str]

    result = negativeEmotionTotal / listTotal

    if (result < threshold):
        print("You are attentive")
    else:
        print("You are inattentive")

        return (result < threshold)

    #happinessScore = emotion_list[0]['scores']['happiness']

    #print("happinessScore")

    #print type(happinessScore)

    #if happinessScore < 1:
    #    print "You are innattentive"





# if __name__ == '__main__':
#     app.run()
emotions = getEmotions()
getInattentive(emotions)
#getClassEngagement({"student1":[0,0,0,0]})
