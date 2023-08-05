import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// { useAuthContext } from "../hooks/useAuthContext";
import "./bookingPage.css";
const BookingsPage = () => {
	const [bookings, setBookings] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [isAppointmentConfirmed, setAppointmentConfirmed] = useState(false);

	useEffect(() => {
		if (selectedDate) {
			fetchBookings(selectedDate);
		}
	}, [selectedDate]);

	const { _id } = useParams();
	const { user } = useAuthContext();

	const [selectedDoctor, setSelectedDoctor] = useState(null);

	useEffect(() => {
		// Make an API call to fetch doctors from the server
		fetch(`http://localhost:4000/api/doctor/${_id}`, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setSelectedDoctor(data))
			.catch((error) => console.error("Error fetching doctors:", error));
	}, []);

	console.log(selectedDoctor);

	const fetchBookings = async (date) => {
		// console.log(user.token);
		try {
			const response = await fetch(
				`http://localhost:4000/api/bookings?date=${date}`,
				{
					// headers: {
					//   Authorization: `Bearer ${user.token}`,
					// },
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch bookings");
			}
			const data = await response.json();
			setBookings(data);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	const handleDateSelect = (date) => {
		setSelectedDate(date);
	};

	const handleTimeSelect = (time) => {
		setSelectedTime(time);
	};

	const getAvailableTimeSlots = () => {
		const bookedTimes = bookings.map((booking) => booking.time);
		const availableTimeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];
		return availableTimeSlots;
	};

	const handleConfirmAppointment = async () => {
		if (selectedDate && selectedTime) {
			try {
				const response = await fetch(
					`http://localhost:4000/api/bookings/${selectedDoctor.userId._id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							// userId: user?.id,
							userId: user._id,
							date: selectedDate,
							time: selectedTime,
						}),
					}
				);

				if (response.ok) {
					setAppointmentConfirmed(true);
				} else {
					alert("Failed to book the appointment. Please try again.");
				}
			} catch (error) {
				console.error("Error booking appointment:", error);
				alert(
					"An error occurred while booking the appointment. Please try again later."
				);
			}
		} else {
			alert(
				"Please select both date and time before confirming the appointment."
			);
		}
	};

	// Available dates from tomorrow till next week
	const today = new Date();
	const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
	const availableDates = [];
	const tempDate = new Date(today);
	while (tempDate < nextWeek) {
		const dateString = tempDate.toISOString().split("T")[0];
		availableDates.push(dateString);
		tempDate.setDate(tempDate.getDate() + 1);
	}

	return (
		<div className="demo1">
			<h1>Booking Details</h1>
			{selectedDoctor && (
				<div
				style={{ padding: '10px', marginBottom: '20px' }}
				>

<article class="cta1">
<div class="cta__text-column">

					<h2 className='bl1'>{selectedDoctor.userId.name}</h2>
					<p className='bl1'>Address: {selectedDoctor.address}</p>
					<p className='bl1'>Speciality: {selectedDoctor.speciality}</p>
					<div>
						<h3 className='bl1'>Select Date:</h3>
						<div>
						<select
							onChange={(e) => handleDateSelect(e.target.value)}
							value={selectedDate}
						>
							<option value="" disabled>
								Select a date
							</option>
							{availableDates.map((date) => (
								<option key={date} value={date}>
									{date}
								</option>
							))}
						</select>
						</div>
						</div>
					</div>

					{selectedDate && (
						<div>
							<h3>Select Time:</h3>
							<select
								onChange={(e) => handleTimeSelect(e.target.value)}
								value={selectedTime}
							>
								<option value="" disabled>
									Select a time
								</option>
								{getAvailableTimeSlots().map((time) => (
									<option key={time} value={time}>
										{time}
									</option>
								))}
							</select>
						</div>
					)}
					</article>
				</div>
			)}
			<button onClick={handleConfirmAppointment}>Confirm Appointment</button>
			{isAppointmentConfirmed && <p>Appointment Confirmed! Thank you.</p>}
		</div>
	);
};

export default BookingsPage;
