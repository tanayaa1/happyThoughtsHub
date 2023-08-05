import { useState } from "react";
import { useChatsContext } from "../hooks/useChatsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ChatForm = () => {
	const myStyles = {
		postion: "fixed",
		margin: "35px",
		color: "white",
		fontSize: "18px",
		padding: "10px",
	};
	const { dispatch } = useChatsContext();
  const { user } = useAuthContext();

	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	const [error, setError] = useState(null);
	const [photo, setPhoto] = useState(null);

	const handleImageChange = (e) => {
	//   const file = e.target.files[0];
	//   setPhoto(file);


	  const file = e.target.files[0];
	  if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
		  setPhoto(reader.result);
		};
	  }

	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", user.name);
		formData.append("title", title);
		formData.append("text", text);
		formData.append("photo", photo);
		const chat = { name: user.name, title, text, photo };

		const response = await fetch("http://localhost:4000/api/chats", {
			method: "POST",
			body: JSON.stringify(chat),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}
		if (response.ok) {
			setError(null);
			setTitle("");
			setText("");
			setPhoto(null);

			console.log("new chat added:", json);

			dispatch({ type: "CREATE_CHAT", payload: json });
		}
	};

	return (
		<form className="create" style={myStyles} onSubmit={handleSubmit}>
			<h3>Add a New chat</h3>

			<label> Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<label>Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
 
			<label> Text:</label>
			<input
				type="text"
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>

			<button className="chatbut">Post </button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default ChatForm;
