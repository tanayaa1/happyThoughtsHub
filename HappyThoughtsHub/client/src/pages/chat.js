import { useEffect } from "react";
// components
import { useChatsContext } from "../hooks/useChatsContext";
import ChatDetails from "../components/ChatDetails";
import ChatForm from "../components/chatForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
	const { user } = useAuthContext();
	const { chats, dispatch } = useChatsContext();

	useEffect(() => {
		if (user) {
		console.log(user.token);
		console.log("Hello");
		const fetchChats = async () => {
			const response = await fetch("http://localhost:4000/api/chats", {
				headers: {
				Authorization: `Bearer ${user.token}`,
				},
			});
			const json = await response.json();

			if (response.ok) {
				// console.log(json);
				dispatch({ type: "SET_CHATS", payload: json });
			}
		};
		fetchChats();
		}
	}, [user]);
	return (
		<div className="home">
			<div className="workouts">
				{chats &&
					chats.map((chat) => <ChatDetails chat={chat} key={chat._id} />)}
			</div>

			<ChatForm />
		</div>
	);
};

export default Chat;
