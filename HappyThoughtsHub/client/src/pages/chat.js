import React, { useEffect, useState } from "react";
import { useChatsContext } from "../hooks/useChatsContext";
//import ChatDetails from "../components/ChatDetails";
import ChatForm from "../components/chatForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./chat.css";
const Chat = () => {
	const { user } = useAuthContext();

	const { chats, dispatch, state } = useChatsContext(); // Use chats and dispatch from the context directly
	// Remove the local data and setData, as we will now use chats and dispatch

	useEffect(() => {
		if (user) {
			const fetchChats = async () => {
				const response = await fetch("http://localhost:4000/api/chats", {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "SET_CHATS", payload: json }); // Update the chats state using the context dispatch
				}
			};
			fetchChats();
		}
	}, [user]);

	const [likesCount, setLikesCount] = useState(0);

	const likeChat = (chatId, likes_count) => {
		// Send a PUT request to the backend to like the chat
		fetch(`http://localhost:4000/api/chats/like/${chatId}`, {
			method: "PUT",
			// headers: {
			//   'Content-Type': 'application/json',
			// },
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				// On successful response, update the frontend to reflect the like
				updateLikesCount();
			})

			.catch((error) => {
				console.error("Error:", error);
				// Handle error scenarios here, e.g., show an error message to the user
			});
	};
	const updateLikesCount = () => {
		// Here, you can fetch the updated chat details from the backend
		// For simplicity, I'll assume you already have the chat data available
		// Replace this with actual code to update your frontend with the new likes count
		const currentLikesCount = 42; // Replace with the actual current likes count
		setLikesCount(currentLikesCount);
	};

	const [reportsCount, setReportsCount] = useState(0);

	const reportChat = (chatId, reports_count) => {
		// Send a PUT request to the backend to like the chat
		fetch(`http://localhost:4000/api/chats/report/${chatId}`, {
			method: "PUT",
			// headers: {
			//   'Content-Type': 'application/json',
			// },
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				// On successful response, update the frontend to reflect the like
				updateReportsCount(chatId, "increment");
			})

			.catch((error) => {
				console.error("Error:", error);
				// Handle error scenarios here, e.g., show an error message to the user
			});
	};
	const updateReportsCount = (chatId, action) => {
		// Here, you can fetch the updated chat details from the backend
		// For simplicity, I'll assume you already have the chat data available
		// Replace this with actual code to update your frontend with the new likes count
		// const currentReportsCount = 42; // Replace with the actual current likes count
		// setLikesCount(currentReportsCount);
		dispatch({
			type: "UPDATE_CHAT_REPORTS_COUNT",
			payload: { chatId, action },
		});
	};

	useEffect(() => {
		if (chats && chats.some((chat) => chat.reports_count >= 3)) {
			// Check if chats exist and if any chat has three or more reports
			const chatToDelete = chats.find((chat) => chat.reports_count >= 3);

			if (chatToDelete) {
				// Send a DELETE request to the backend to delete the chat
				fetch(`http://localhost:4000/api/chats/${chatToDelete._id}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${user.token}`,
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						// Remove the chat from the chats state
						dispatch({ type: "DELETE_CHAT", payload: chatToDelete._id });
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			}
		}
	}, [chats, dispatch, user]);

	return (
		<div className="chat111">
			{chats &&
				chats.map((chat) => (
					<div className="border" key={chat._id}>
						<div className="chat-container">
							{chat.photo && (
								<div className="chat-image">
									<img src={chat.photo.url} alt="Chat Photo" />
								</div>
							)}

							<div className="chat-content">
								<p>
									<strong>Name: </strong>
									{chat.name}
								</p>

								<p>
									<strong>Title: </strong>
									{chat.title}
								</p>

								<p>
									<strong>My thoughts: </strong>
									{chat.text}
								</p>

								<div className="actions-container">
									<div>
										<i
											className="material-icons"
											onClick={() => likeChat(chat._id, chat.likes_count)}
											style={{ cursor: "pointer" }}
										>
											thumb_up
										</i>
										<p>{chat.likes.length} Likes</p>
									</div>
									<div>
										<i
											className="material-icons"
											onClick={() => reportChat(chat._id, chat.reports_count)}
											style={{ cursor: "pointer" }}
										>
											report
										</i>
										<p>{chat.reports.length} Reports</p>
									</div>
								</div>

								<p>Date & Time: {chat.createdAt}</p>
							</div>
						</div>
					</div>
				))}

			<ChatForm />
		</div>
	);
};

export default Chat;
