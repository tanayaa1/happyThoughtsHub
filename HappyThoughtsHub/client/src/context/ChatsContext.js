import { createContext, useReducer } from 'react'

export const ChatsContext = createContext()

export const chatsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHATS':
      return { 
        chats: action.payload 
      }
    case 'CREATE_CHAT':
      return { 
        chats: [action.payload, ...state.chats] 
      }
    default:
      return state
  }
}

export const ChatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, { 
    chats: null
  })
  
  return (
    <ChatsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ChatsContext.Provider>
  )
}