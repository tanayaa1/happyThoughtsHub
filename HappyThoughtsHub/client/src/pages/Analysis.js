import React, { useState } from "react";

const Analysis = () => {
	const [inputText, setInputText] = useState("");
	const [sentimentResult, setSentimentResult] = useState(null);
	const apiKey = "uPRJGKxHlywl5ldtKE7iriXnAEDFYlXZ";

	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};

	const handleAnalysisSubmit = () => {
		const myHeaders = new Headers();
		myHeaders.append("apikey", apiKey);

		const requestOptions = {
			method: "POST",
			redirect: "follow",
			headers: myHeaders,
			body: JSON.stringify({
				content_type: "text",
				language: "en",
				text: inputText,
			}),
		};

		fetch("https://api.apilayer.com/sentiment/analysis", requestOptions)
			.then((response) => response.json())
			.then((result) => setSentimentResult(result))
			.catch((error) => console.log("error", error));
	};

	return (
		<div>
            <h1>Sentiment Analyser</h1>
			<label>Enter text:</label>
			<input type="text" value={inputText} onChange={handleInputChange} />
			<button onClick={handleAnalysisSubmit}>Analyze Sentiment</button>

			{sentimentResult && (
				<div>
					<h2>Sentiment Analysis Result:</h2>
					<p>Content Type: {sentimentResult.content_type}</p>
					<p>Language: {sentimentResult.language}</p>
					<p>Sentiment: {sentimentResult.sentiment}</p>
				</div>
			)}
		</div>
	);
};

export default Analysis;
