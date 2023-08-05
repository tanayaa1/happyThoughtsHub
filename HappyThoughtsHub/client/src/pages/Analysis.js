import React, { useState } from 'react';
import './analysis.css';
const Analysis = () => {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const apiKey = 'uPRJGKxHlywl5ldtKE7iriXnAEDFYlXZ';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAnalysisSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', apiKey);

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: JSON.stringify({
        content_type: 'text',
        language: 'en',
        text: inputText,
      }),
    };

    fetch('https://api.apilayer.com/sentiment/analysis', requestOptions)
      .then((response) => response.json())
      .then((result) => setSentimentResult(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <div className='parent-container'>
    <div className='analysis1'>
      <label className='bll'>Enter text:</label>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleAnalysisSubmit} >Analyze Sentiment</button>

      {sentimentResult && (
        <div >
          <h2 className='bll'>Sentiment Analysis Result:</h2>
          <p className='bll'>Content Type: {sentimentResult.content_type}</p>
          <p className='bll'>Language: {sentimentResult.language}</p>
          <p className='bll'>Sentiment: {sentimentResult.sentiment}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Analysis;
