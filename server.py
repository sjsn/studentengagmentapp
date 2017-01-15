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
    emotion_list = response.json()
    response = requests.request('POST', ms_emotion_url, json=params, data=None, headers=headers, params=None)
    emotion_list = response.json()
    pretty = json.dumps(response.json(), sort_keys=True, indent=4, separators=(',', ':'))
    print(emotion_list)
    print (pretty)


def getInattentive(emotion_list):
    # Get innattentive
    if emotion_list[0]['score']['neutral'] < 0.7:
        print "You are innattentive"
    return getEmotions


# if __name__ == '__main__':
#     app.run()


getEmotions()

getInattentive('neutral')

#emotions = getEmotions()
# getInattentive(emotions) is this what we want??
