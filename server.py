from flask import Flask, render_template, request, jsonify
import requests, json
import time as _time
from secrets import emotions_key
import math

app = Flask(__name__)

ms_emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'

test_img = 'https://portalstoragewuprod2.azureedge.net/media/Default/Documentation/Computer-vision/Images/woman_roof.jpg'
#'https://larrycuban.files.wordpress.com/2015/11/enhanced-buzz-wide-4644-1444018953-9.jpg'


@app.route('/api/question', methods=['GET'])
def main():
    if request.form['query'] is not None:
        query = request.form['query']
        answer = get(query)
        result = {"query": query, "answer": answer}
    return jsonify(result)

@app.route('/api/createClassroom', methods=['POST'])
def createClassroom():
    if request.form['teacherID'] is not None and request.form['students'] is not None:
        createClassroom = request.form['classID']
        numbers = getClassID()
        result = {"classID": classID, "numbers": numbers}
    return jsonify(result)

#@app.route('/api/studentLogIn', methods = ['POST'])
#def studentLogIn():

#@app.route('/api/teacherLogIn', method = ['POST'])
#def teacherLogIn():
def getClassID():
    uniqueNumRaw = _time.time()
    print("uniqueNumRaw: ", uniqueNumRaw)
    #math.floor(uniqueNumRaw / 10000)*10000
    uniqueNum = math.floor(10000*((uniqueNumRaw/10000)-math.floor(uniqueNumRaw/10000)))
    print("uniqueNum: ", uniqueNum)

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


def getInattentive(emotion_list): # I think emotions is a dictionary?
    threshold = .5 # negative emotion summation above this indicates innatention

    result = 0
    for str in {"anger", "contempt", "disgust", "fear"}:
        temp = emotion_list[0]['scores'][str]
        result += temp
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
getClassID()

# getInattentive(emotions) is this what we want??
