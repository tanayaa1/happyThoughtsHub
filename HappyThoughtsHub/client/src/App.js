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
import { RegisterDoctor } from "./components/RegisterDoctor";

import { useAuthContext } from "./hooks/useAuthContext";
import DoctorProfiles from "./pages/browseDoctors";
import BrowseBookings from "./pages/browseBookings";
import BookingsPage from "./pages/bookingPage";
import Profile from "./components/Profile";
import EditDoctor from "./components/EditDoctor";
import AddDoctor from "./components/AddDoctor";
import About from "./components/About";
import Analysis from "./pages/Analysis";
function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Banner />} />
						<Route path="/about" element={<About />} />
						<Route path="/profile/:_id" element={<Profile />} />
						<Route path="/doctor/edit/:_id" element={<EditDoctor />} />
						<Route
							path="/doctor/add/:email"
							element={!user ? <Register /> : <AddDoctor />}
						/>
						<Route
							path="/analysis"
							// element={user ? <Chat /> : <Navigate to="/" />}
							element={<Analysis />}
						/>
						<Route
							path="/chat"
							// element={user ? <Chat /> : <Navigate to="/" />}
							element={<Chat />}
						/>
						<Route
							path="/doctors"
							element={!user ? <Register /> : <DoctorProfiles></DoctorProfiles>}
						/>
						<Route
							path="/doctors/book/:_id"
							element={!user ? <Register /> : <BookingsPage></BookingsPage>}
						/>
						<Route
							path="/appointments/:_id"
							element={!user ? <Register /> : <BrowseBookings />}
						/>
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!user ? <Register /> : <Navigate to="/" />}
						/>
						<Route
							path="/registerdoc"
							element={!user ? <RegisterDoctor /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
