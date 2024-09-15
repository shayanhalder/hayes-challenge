from flask import Flask, jsonify, request
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return "You are at the home page of the web server."

@app.route('/parse-file', methods=['POST'])
def parse_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # write the uploaded file to a temporary file 'input.txt'
    input_file_path = 'input.txt'
    file.save(input_file_path)

    # Run the bash script with the file as an argument
    bash_script = './backend.sh'
    try:
        # Execute the bash script and capture the output
        result = subprocess.run([bash_script, input_file_path], capture_output=True, text=True)

        # Check if the script ran successfully
        if result.returncode != 0:
            return jsonify({'error': 'Script failed', 'output': result.stderr}), 500

        # Return the script's output
        return jsonify({'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)




