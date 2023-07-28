import { useEffect} from "react"
// components
import { useChatsContext } from "../hooks/useChatsContext"
import ChatDetails from "../components/ChatDetails"
import ChatForm from "../components/chatForm"

const Chat = () => {
 
  
  const { chats, dispatch } = useChatsContext()


    useEffect(() => {
      const fetchChats = async () => {
        const response = await fetch('http://localhost:4000/api/chats')
        const json = await response.json()
  
        if (response.ok) {
          console.log(json)
          dispatch({type: 'SET_CHATS', payload: json})
        }
      }
  
      fetchChats()
    },  [dispatch])
    return (
      
      <div className="home">
      <div className="workouts">
      {chats && chats.map(chat => (
          <ChatDetails chat={chat} key={chat._id} />
        ))}
      </div>
      
     <ChatForm></ChatForm>
    
      
    </div>
    )
  }
  
  export default Chat