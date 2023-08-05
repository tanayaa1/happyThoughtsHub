import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./browseDoctors.css";
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
		window.location.href = `/doctors/book/${doctor.userId._id}`;
	};
	return (
		<div className="demo">
			{/* <h1>Doctor Profiles</h1> */}
			{doctorsData.map((doctor, index) => (
				<div
					key={index}
					style={{
						padding: "10px",
						marginBottom: "20px",
					}}
				>
					<article class="cta">
						<div class="cta__text-column">
							<h2 className="bl">{doctor.userId.name}</h2>
							<p className="bl">Address: {doctor.address}</p>
							<p className="bl">Speciality: {doctor.speciality}</p>
							<button onClick={() => handleBookAppointment(doctor)}>
								Book Appointment
							</button>
							{/* <Link to={`/doctors/book/${doctor.userId._id}`}>
								<button onClick={() => handleBookAppointment(doctor)}>
									Book Appointments
								</button>
							</Link> */}
						</div>
					</article>
				</div>
			))}
		</div>
	);
};

export default DoctorProfiles;
