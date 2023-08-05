import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const DoctorProfiles = () => {
	const [doctorsData, setDoctorsData] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const { user } = useAuthContext();

	useEffect(() => {
		// Make an API call to fetch doctors from the server
		if (user) {
			fetch(`http://localhost:4000/api/bookings/doctor/${user._id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},	
			})
				.then((response) => response.json())
				.then((data) => setDoctorsData(data))
				.catch((error) => console.error("Error fetching doctors:", error));
		}
	}, []);

	console.log(doctorsData);

	// Handle the booking process
	// const handleBookAppointment = (doctor) => {
	// 	setSelectedDoctor(doctor);
	// };
	return (
		<div>
			<h1 style={{marginTop:"120px"}}>Browse Bookings for {user.name}</h1>
			{doctorsData.map((doctor, index) => (
				<div
					key={index}
					style={{
						border: "1px solid #ccc",
						padding: "10px",
						marginBottom: "20px",
					}}
				>
					<h2>{doctor.userId && doctor.userId.name}</h2>
					<p>Date: {doctor.date}</p>
					<p>Time: {doctor.time}</p>
					{/* <button
						className="but1"
						onClick={() => handleBookAppointment(doctor)}
					>
						Book Appointment
					</button> */}
					<h6 className="text-muted f-w-400">
						{/* <Link to={`/doctors/book/${doctor.userId._id}`}>
							<button
								className="but1"
								onClick={() => handleBookAppointment(doctor)}
							>
								<span>Book Appointments</span>
							</button>
						</Link> */}
					</h6>
				</div>
			))}
		</div>
	);
};

export default DoctorProfiles;
