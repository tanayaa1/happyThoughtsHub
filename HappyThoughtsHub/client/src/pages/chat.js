
import React ,{ useEffect, useState } from "react";
import { useChatsContext } from "../hooks/useChatsContext";
//import ChatDetails from "../components/ChatDetails";
import ChatForm from "../components/chatForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
const Chat = () => {
	const navigate = useNavigate();
  const { user } = useAuthContext();
  const [likes, setLikes] = useState()

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
  // const handleClick = (chatId, likes_count) => {
	// if (!user) {
	// 	navigate("/login");
	// 	return;
	// }
	// setLikes(likes_count + 1);  
	// //console.log(chatId + " inside the handle click ");
	// fetch(`http://localhost:4000/chats/like/${chatId}`, {
	//   method: "PUT",
	//   body: JSON.stringify({ chatId }), // Send only the required data in the request body
	//   headers: {
	// 	"Content-Type": "application/json",
	// 	Authorization: `Bearer ${user.token}`,
	//   },
	// })
	// .then(() => {
	//   // navigate("/wishlist");
	//   console.log(chatId + " liked");
	// })
	// .catch((error) => {
	//   console.error("Error updating like:", error);
	// });
  // };
  const [likesCount, setLikesCount] = useState(0);

  const likeChat = (chatId,likes_count) => {
    // Send a PUT request to the backend to like the chat
    fetch(`http://localhost:4000/api/chats/like/${chatId}`, {
      method: 'PUT',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // On successful response, update the frontend to reflect the like
        updateLikesCount();
      })
    
      .catch((error) => {
        console.error('Error:', error);
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


  return (
    <div>
      {chats &&
        chats.map((chat) => (
          <div className="border" key={chat._id}>
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
              onClick={() => likeChat(chat._id,chat.likes_count)}
              style={{ cursor: "pointer" }}
            >
              thumb_up
            </i>
            <p>{chat.likes.length} likes</p>
			{/* <button onClick={() => handleClick(chat, chat.likes_count)} size="small">
											Like 
											{" "}
											{chat.likes_count}
										</button> */}
            <i className="material-icons">{/* Other icons */}</i>
         
            <p>date & time:{chat.createdAt}</p>
          </div>
        ))}

      <ChatForm />
    </div>
  );
};

export default Chat;
