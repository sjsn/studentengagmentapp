from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/api/question', methods=['GET'])
def main():
    if request.form['query'] is not None:
        query = request.form['query']
        answer = get(query)
        result = {"query": query, "answer": answer}
    return jsonify(result)

def getInattentive(emotions):
    // Get innattentive

if __name__ == '__main__':
    app.run()
