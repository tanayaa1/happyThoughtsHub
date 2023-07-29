import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// pages & components
import Chat from './pages/chat'
import NavBar from './components/navbar'
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Login from "./components/Login"
import { Register } from './components/Register';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Banner />
      {/* <Skills />
      <Projects />
      <Contact />
      <Footer /> */}
        <div className="pages">
          <Routes>
            <Route 
              path="/chat" 
              element={<Chat />} 
            />
          </Routes>
          <Routes>
            <Route 
              path="/login" 
              element={<Login />} 
            />
          </Routes>
          <Routes>
            <Route 
              path="/register" 
              element={<Register />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;