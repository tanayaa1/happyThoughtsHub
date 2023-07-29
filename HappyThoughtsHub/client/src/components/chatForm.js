import {useState} from "react"
import { useChatsContext } from "../hooks/useChatsContext"

const ChatForm = () => {

  const { dispatch } = useChatsContext()


  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const chat = {title, text}
    
    const response = await fetch('http://localhost:4000/api/chats', {
      method: 'POST',
      body: JSON.stringify(chat),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setText('')
      
      console.log('new chat added:', json)

       dispatch({type: 'CREATE_CHAT' , payload:json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New chat</h3>

      <label> Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />
<label> Text:</label>
      <input 
        type="text" 
        onChange={(e) => setText(e.target.value)} 
        value={text}
      />
      
      <button>Post </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ChatForm