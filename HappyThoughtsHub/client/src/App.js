import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Chat from './pages/chat'
import Navbar from './components/navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Chat />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;