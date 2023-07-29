import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

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
					<p className="logostyle">MOOD~UP</p>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<span className="navbar-toggler-icon"></span>
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link
							href="#home"
							className={
								activeLink === "home" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("home")}
						>
							Home
						</Nav.Link>
						<Nav.Link
							href="#skills"
							className={
								activeLink === "skills" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("skills")}
						>
							Community
						</Nav.Link>
						<Nav.Link
							href="#projects"
							className={
								activeLink === "projects" ? "active navbar-link" : "navbar-link"
							}
							onClick={() => onUpdateActiveLink("projects")}
						>
							Chat
						</Nav.Link>
					</Nav>
					<span className="navbar-text">
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
					</span>
				</Navbar.Collapse>
			</Container>
			{user && (
				<div>
					<span>{user.name}</span>
					<button onClick={handleClick}>Log out</button>
				</div>
			)}
			{!user && (
				<div className="flex space-x-4">
					<Link to="/login">Login</Link>
					<Link to="/register">Signup</Link>
				</div>
			)}
			<Nav.Link href="/chat">
				<button className="vvd">
					<span>Let’s Connect</span>
				</button>
			</Nav.Link>
		</Navbar>
	);
};

export default NavBar;
