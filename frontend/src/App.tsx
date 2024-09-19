import { useRef, useState } from "react"
import './App.css'
 
const ENDPOINT = import.meta.env.VITE_BACKEND 

function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [outputText, setOutputText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function sendFile() { 
        setLoading(true);
        let formData = new FormData();
        if (inputRef.current && inputRef.current.files) {
            const file = inputRef.current.files[0]
            formData.append('file', file) 
            let response = await fetch(`${ENDPOINT}/parse-file`, {
              method: "POST",
              body: formData, 
              headers: {
                'Accept': 'application/json'
              }, 
            }); 
            const data = await response.json(); 
            const outputText = data.output;
            setOutputText(outputText);
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Professor Hayes Linux Web Server Challenge</h2>
            <div className="menu">
                <div>Upload input file here:  </div>
                <div className="file-container"><input type='file' id='imageUpload' name='imageUpload' accept='*' ref={inputRef}/> </div>
                <div><button type='submit' onClick={sendFile}> Submit </button></div>
                <textarea value={outputText} placeholder={loading ? "Loading..." : "Bash script output here..."} readOnly></textarea>
            </div>
        </div>
    )
}


export default App