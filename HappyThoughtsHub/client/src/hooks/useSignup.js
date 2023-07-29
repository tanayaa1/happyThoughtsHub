import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// const url_proxy = "https://syntax-terminators-hosting-api.vercel.app/";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (name, email, password, role) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`http://localhost:4000/api/auth/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password, role }),
		});

		const json = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (response.ok) {
			//save the user to local storage
			localStorage.setItem("user", JSON.stringify(json));

			//update the auth context
			dispatch({ type: "LOGIN", payload: json });

			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};
