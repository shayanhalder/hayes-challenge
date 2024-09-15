from flask import Flask, jsonify, request
import subprocess
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins='*')
 

@app.route('/')
def home():
    return "You are at the home page of the web server."

@app.route('/parse-file', methods=['POST']) 
def parse_file():
    print('received request! ')
    if 'file' not in request.files:
        return jsonify({'error': 'No file given. '}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    input_file_path = 'input.txt'
    file.save(input_file_path)
    bash_script = './backend.sh'
    try:
        result = subprocess.run([bash_script, input_file_path], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        if result.returncode != 0:
            return jsonify({'error': 'Script failed', 'output': result.stderr}), 500

        return jsonify({'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0", port='3002')
    app.run(debug=True)#, host="0.0.0.0", port='3002')




