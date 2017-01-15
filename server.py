from flask import Flask, render_template, request, jsonify
import requests, json
from secret import emotions_key

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


def getInattentive(emotion_list):
    # Get innattentive
    print("emotionlist type: ")
    print type(emotion_list)

    print("emotionlist(0) is: ")
    print emotion_list[0]
    thresh = 0

    for scores in range(0,3):
            if emotion_list[0]['scores'][scores] > 0.5:
                thresh += scores
            print "You are innattentive"
    #happinessScore = emotion_list[0]['scores']['happiness']

    #print("happinessScore")

    #print type(happinessScore)

    #if happinessScore < 1:
    #    print "You are innattentive"




# if __name__ == '__main__':
#     app.run()
emotions = getEmotions()
getInattentive(emotions)

# getInattentive(emotions) is this what we want??
