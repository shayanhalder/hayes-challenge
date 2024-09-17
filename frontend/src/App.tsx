import { useRef, useState } from "react"
import './App.css'

const ENDPOINT = 'http://127.0.0.1:5000/parse-file'
function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [outputText, setOutputText] = useState<string>("");

    async function sendFile() { 
        let formData = new FormData()
        if (inputRef.current && inputRef.current.files) {
            const file = inputRef.current.files[0]
            formData.append('file', file) 
            let response = await fetch(ENDPOINT, {
              method: "POST",
              body: formData, 
              headers: {
                'Accept': 'application/json'
              }, 
            }) 
            const data = await response.json() 
            const outputText = data.output;
            setOutputText(outputText);


        }
    }

    return (
        <div>
            <h2>Professor Hayes Linux Web Server Challenge</h2>
            <div className="menu">
                <div>Upload input file here:  </div>
                <div className="file-container"><input type='file' id='imageUpload' name='imageUpload' accept='*' ref={inputRef}/> </div>
                <div><button type='submit' onClick={sendFile}> Submit </button></div>
                <textarea value={outputText} placeholder="Bash script output here..." readOnly>

                </textarea>
            </div>

        </div>
    )
}


export default App