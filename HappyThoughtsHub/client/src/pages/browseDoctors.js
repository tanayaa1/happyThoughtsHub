import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const DoctorProfiles = () => {
	// Dummy data array of doctor profiles
	// const doctorsData = [
	// 	{
	// 		name: "Dr. John Doe",
	// 		address: "123 Main Street, City, Country",
	// 		speciality: "Cardiology",
	// 	},
	// 	{
	// 		name: "Dr. Jane Smith",
	// 		address: "456 Elm Street, Town, Country",
	// 		speciality: "Dermatology",
	// 	},
	// 	// Add more doctor profiles here
	// ];
	const [doctorsData, setDoctorsData] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	useEffect(() => {
		// Make an API call to fetch doctors from the server
		fetch("http://localhost:4000/api/doctor")
			.then((response) => response.json())
			.then((data) => setDoctorsData(data))
			.catch((error) => console.error("Error fetching doctors:", error));
	}, []);

	console.log(doctorsData);

	// Handle the booking process
	const handleBookAppointment = (doctor) => {
		setSelectedDoctor(doctor);
	};
	return (
		<div>
			<h1>Doctor Profiles</h1>
			{doctorsData.map((doctor, index) => (
				<div
					key={index}
					style={{
						border: "1px solid #ccc",
						padding: "10px",
						marginBottom: "20px",
					}}
				>
					<h2>{doctor.userId.name}</h2>
					<p>Address: {doctor.address}</p>
					<p>Speciality: {doctor.speciality}</p>
					{/* <button
						className="but1"
						onClick={() => handleBookAppointment(doctor)}
					>
						Book Appointment
					</button> */}
					<h6 className="text-muted f-w-400">
						<Link to={`/doctors/book/${doctor.userId._id}`}>
							<button
								className="but1"
								onClick={() => handleBookAppointment(doctor)}
							>
								<span>Book Appointments</span>
							</button>
						</Link>
					</h6>
				</div>
			))}
		</div>
	);
};

export default DoctorProfiles;
