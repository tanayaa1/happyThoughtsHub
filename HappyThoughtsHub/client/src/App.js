import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// pages & components
import Chat from "./pages/chat";
import NavBar from "./components/navbar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Login from "./components/Login";
import { Register } from "./components/Register";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Banner />} />
						<Route
							path="/chat"
							// element={user ? <Chat /> : <Navigate to="/" />}
							element={<Chat />}
						/>
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!user ? <Register /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
