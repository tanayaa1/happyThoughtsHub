import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import url_proxy from "../api/api";
// const url_proxy = "https://syntax-terminators-hosting-api.vercel.app/";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${url_proxy}comparazon/user/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({email, password }),
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
