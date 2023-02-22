
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import ReactLoading from "react-loading";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setIsLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
    setIsLoading(false)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>AI Art Generator</h2>
      <input
        style={styles.userInput}
        placeholder="Enter your art prompt here..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button style={styles.generateButton} onClick={generateImage}>Generate Image</button>

      {isLoading ? 
        <ReactLoading type="bubbles" color="#0000FF"
          height={200} width={200} />

        : result.length > 0 ? 

          <img style={styles.generatedImage} src={result} alt="result" />

          : <></>
      }
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '25%',
    paddingRight: '25%',
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'black',
    minHeight: '100%'
  },
  header: {
    fontSize: 50,
    color: 'white'
  },
  userInput: {
    fontSize: 18,
    width: '100%',
    marginBottom: 50,
    textAlign: 'center'
  },
  generateButton: {
    fontSize: 20,

  },
  generatedImage: {
    marginTop: 50,
    border: 'solid gray 3px'
  }
}