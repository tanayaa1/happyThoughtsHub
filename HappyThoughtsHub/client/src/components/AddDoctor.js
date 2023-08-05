import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const EditDoctor = () => {
	const [formData, setFormData] = useState({
		address: "",
		speciality: "",
	});

	const { email } = useParams();
	const { user } = useAuthContext();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!user) {
			window.location.href = "/login";
			return;
		}
		console.log("Form data submitted:", formData);
		setFormData({
			userId: "",
			address: "",
			speciality: "",
		});
		fetch(`http://localhost:4000/api/doctor/${user._id}`, {
			method: "PUT",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		}).then((e) => {
			console.log(e);
		});
		window.location.href = `/profile/${user._id}`;
		// window.location.href = `/`;
	};
	console.log(formData);

	return (
		<div className="auth-form-container">
			<form onSubmit={handleSubmit} className="mt-auto">
				{/* <div>
					<label>User ID:</label>
					<input
						type="text"
						name="userId"
						value={formData.userId}
						onChange={handleChange}
					/>
				</div> */}
				<h2>Add more details:</h2>
                
				<div>
					<label>Address:</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Speciality:</label>
					<input
						type="text"
						name="speciality"
						value={formData.speciality}
						onChange={handleChange}
					/>
				</div>
				<button className="but1" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditDoctor;
