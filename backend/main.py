from flask import Flask, jsonify, request
import subprocess
from flask_cors import CORS
import os
import tempfile
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins='*')

load_dotenv()
BASH_SCRIPT = os.getenv('BASH_SCRIPT')

@app.route('/')
def home():
    return "You are at the home page of the web server."

@app.route('/parse-file', methods=['POST']) 
def parse_file():
    # input validation
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file given. '}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # we need to save the in-memory file data to a temporary file to run the bash script on 
    # we'll use tempfile module to do that 
    
    with tempfile.NamedTemporaryFile(mode='w+', delete=True) as temp_file:
        file.save(temp_file.name)
        
        try:
            result = subprocess.run([BASH_SCRIPT, temp_file.name], stdout=subprocess.PIPE, 
                                    stderr=subprocess.STDOUT, text=True) # run the bash script with the input file
            if result.returncode != 0:
                return jsonify({'error': 'Script failed', 'output': result.stderr}), 500

            return jsonify({'output': result.stdout})
        except Exception as e:
            return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True) 




