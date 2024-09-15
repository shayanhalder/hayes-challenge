import { useRef, useState } from "react"

const ENDPOINT = 'http://127.0.0.1:5000/parse-file'
// const ENDPOINT = 'http://192.168.1.18:3002/parse-file'
function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [outputText, setOutputText] = useState<string>("");


    async function sendFile() { 
        let formData = new FormData()
        if (inputRef.current && inputRef.current.files) {
            const file = inputRef.current.files[0]
            formData.append('file', file)
            console.log('file: ', file)
            
            let response = await fetch(ENDPOINT, {
              method: "POST",
              body: formData,
              // mode: 'no-cors',
              headers: {
                'Accept': 'application/json'
              },
              // credentials: 'include'
            })
            console.log('response: ', response)

            const data = await response.json()
            console.log('response data: ', data)  
            const outputText = data.output;
            setOutputText(outputText);


        }
    }

    return (
        <div>
            <h1>Home</h1>
            <div className="menu">
                <input type='file' id='imageUpload' name='imageUpload' accept='*' ref={inputRef}/> 
                <button type='submit' onClick={sendFile}> Submit </button>
            </div>

            <textarea value={outputText}>

            </textarea>
        </div>
    )
}


export default App