
const ChatDetails = ({ chat }) => {

  return (
    <div className="workout-details">
     
      <p><strong>title: </strong>{chat.title}</p>
      <p><strong>my thoughts: </strong>{chat.text}</p>
      <p>date & time:{chat.createdAt}</p>
    </div>
  )
}

export default ChatDetails