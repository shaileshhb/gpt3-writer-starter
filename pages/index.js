import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState("")
  const [apiOutput, setAPIOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState("")

  const onUserInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const onGenerateClick = async () => {
    console.log("onGenerateClick");
    setIsGenerating(true)

    console.log("calling openai.......");
    const response = await fetch('/api/generate', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    })

    const data = await response.json()
    console.log("data => ", data);

    const { output } = data
    console.log("openai response => ", output.text);
    setAPIOutput(`${output.text}`)
    setIsGenerating(false)
  }

  return (
    <div className="root">
      <Head>
        <title>MCQ Generator using GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>MCQQuest generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Generate mutliple choice questions using gpt-3</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea placeholder='specify topic for which mcq should be generated' className='prompt-box'
            value={userInput} onChange={onUserInputChange} />

          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={onGenerateClick}>
              <div className='generate'>
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Home;
