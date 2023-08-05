import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

export const Register = (props) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");

	const { signup, error, isLoading } = useSignup();

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(email);
	// };

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(name, email, pass, "user");
		await signup(name, email, pass, "user");
	};

	return (
		<div className="auth-form-container">
			<h2>Register</h2>
			<form className="register-form" onSubmit={handleSubmit}>
				<label htmlFor="name">Full name</label>
				<input
					value={name}
					name="name"
					onChange={(e) => setName(e.target.value)}
					id="name"
					placeholder="full Name"
				/>
				<label htmlFor="email">email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="youremail@gmail.com"
					id="email"
					name="email"
				/>
				<label htmlFor="password">password</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					placeholder="********"
					id="password"
					name="password"
				/>
				<button type="submit">Log In</button>
			</form>
			<button className="link-btn" onClick={() => props.onFormSwitch("login")}>
				<Link to="/login">Already have an account? Login here.</Link>
			</button>
		</div>
	);
};
