import { useEffect, useState } from "react";
// components
import { useChatsContext } from "../hooks/useChatsContext";
import ChatDetails from "../components/ChatDetails";
import ChatForm from "../components/chatForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
	const { user } = useAuthContext();
	const { chats, dispatch, state } = useChatsContext();
	const [data, setData] = useState([]);

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

	const likePost = (id) => {
		fetch("/like", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				//  "Authorization":"Bearer "+localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				chatId: id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				const newData = data.map((item) => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		//  <div className="home">
		// 	<div className="workouts">
		// 	// 	{chats &&
		// 	// 		chats.map((chat) => <ChatDetails chat={chat} key={chat._id} />)}
		//  </div>

		// 	<ChatForm />
		// </div>

		<div>
			{chats &&
				chats.map((chat) => (
					<div className="border">
						<p>
							<strong>name: </strong>
							{chat.name}
						</p>
						<p>
							<strong>title: </strong>
							{chat.title}
						</p>
						<p>
							<strong>my thoughts: </strong>
							{chat.text}
						</p>
						<i
							className="material-icons"
							onClick={() => {
								likePost(chat.id);
							}}
						>
							thumb_up
						</i>

						<i
							className="material-icons"
							// onClick={()=>{reportPost(chat.id)}}
						>
							report
						</i>
						<p>{chat.likes.length} likes</p>
						<p>date & time:{chat.createdAt}</p>
					</div>
				))}

			<ChatForm></ChatForm>
		</div>
	);
};

export default Chat;
