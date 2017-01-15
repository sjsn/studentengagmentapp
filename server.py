from flask import Flask, render_template, request, jsonify
import requests, json
from secrets import emotions_key

app = Flask(__name__)

ms_emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'

test_img = 'https://larrycuban.files.wordpress.com/2015/11/enhanced-buzz-wide-4644-1444018953-9.jpg'

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

def getEmotions():
    params = {
        "url": test_img
    }
    headers = {}
    headers['Ocp-Apim-Subscription-Key'] = emotions_key
    headers['Content-Type'] = 'application/json'
    data = None
    response = requests.request('POST', ms_emotion_url, json=params, data=None, headers=headers, params=None)
    emotion_list = json.dumps(response.json(), sort_keys=True, indent=4, separators=(',', ':'))
    print(emotion_list)

def getInattentive(emotions):
    # Get innattentive
    return emotions


if __name__ == '__main__':
    app.run()

# getEmotions()
