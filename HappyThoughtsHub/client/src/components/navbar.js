import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Dropdown from "react-bootstrap/Dropdown";

const NavBar = () => {
	const [activeLink, setActiveLink] = useState("home");
	const [scrolled, setScrolled] = useState(false);

	const { logout } = useLogout();
	const { user } = useAuthContext();

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleClick = () => {
		logout();
	};

	const onUpdateActiveLink = (value) => {
		setActiveLink(value);
	};
	return (
		<Navbar expand="md" className={scrolled ? "scrolled" : ""}>
			<Container>
				<Navbar.Brand href="/">
					<p className="logostyle">HAPPY-SPACE❤️</p>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<span className="navbar-toggler-icon"></span>
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* <Nav.Link
							// href="/"
							className={
								activeLink === "home" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("home")}
						>
							Home
						</Nav.Link> */}
						<Nav.Link
							href="/about"
							className={
								activeLink === "skills" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("skills")}
						>
							About
						</Nav.Link>
						<Nav.Link
							href="/analysis"
							className={
								activeLink === "skills" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("skills")}
						>
							Analysis
						</Nav.Link>
						{/* <Nav.Link
							href="#projects"
							className={
								activeLink === "projects" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("projects")}
						>
							Chat
						</Nav.Link> */}
					</Nav>
					{/* <span className="navbar-text">
						<div className="social-icon">
							<a href="#">
								<img src={navIcon1} alt="" />
							</a>
							<a href="#">
								<img src={navIcon2} alt="" />
							</a>
							<a href="#">
								<img src={navIcon3} alt="" />
							</a>
						</div>
					</span> */}
				</Navbar.Collapse>
			</Container>
			{user && (
				<div>
					<span>{user.name}</span>
					<button onClick={handleClick} className="logout">
						Logout
					</button>
				</div>
			)}
			{!user && (
				<div className="mx-2">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Sign in
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="/register">As User</Dropdown.Item>
							<Dropdown.Item href="/registerdoc">As Doctor</Dropdown.Item>
							{/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			)}
			{user && (
				<Nav>
					<div className="mx-2">
						<Dropdown as={Nav.Item}>
							<Dropdown.Toggle as={Nav.Link}>
								<button className="logout">View</button>
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to="/doctors">
									Doctors
								</Dropdown.Item>
								<Dropdown.Item as={Link} to="/doctors/book">
									Bookings
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</Nav>
			)}

			<Nav.Link href="/chat">
				<button className="vvd">
					<span>Lets Connect</span>
				</button>
			</Nav.Link>
		</Navbar>
	);
};

export default NavBar;
