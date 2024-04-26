import os
from flask import Flask, request, jsonify
from vapi_python import Vapi

app = Flask(__name__)

@app.route('/start-call', methods=['POST'])
def start_call():
    vapi = Vapi(api_key=os.environ['VAPI_PUBLIC_KEY'])
    assistant = {
        'firstMessage': request.json['message'],
        'model': 'gpt-3.5-turbo',
        'voice': 'jennifer-playht'
    }
    # This is a mock function to simulate starting a call
    result = vapi.start(assistant=assistant)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)