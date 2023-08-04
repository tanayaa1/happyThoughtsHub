// BookingsPage.js
import React from 'react';
import bookingsData from './bookingsData.json';
import { useState } from 'react';
const BookingsPage = () => {
  // Assuming you are using React Router for navigation, you can access the selectedDoctor using URL params or Redux state.
  // For simplicity, we'll directly access the first item in the bookingsData array.
  const selectedDoctor = bookingsData[0];





  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // State for tracking booked times
  const [is10AMBooked, setIs10AMBooked] = useState(false);
  const [is11AMBooked, setIs11AMBooked] = useState(false);
  const [is12PMBooked, setIs12PMBooked] = useState(false);
  const [is1PMBooked, setIs1PMBooked] = useState(false);

  // Helper function to reset time selection for a new date
  const resetTimeSelection = () => {
    setSelectedTime(null);
    setIs10AMBooked(false);
    setIs11AMBooked(false);
    setIs12PMBooked(false);
    setIs1PMBooked(false);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    resetTimeSelection();
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    // Set the corresponding boolean to true to mark the time as booked
    switch (time) {
      case '10:00 AM':
        setIs10AMBooked(true);
        break;
      case '11:00 AM':
        setIs11AMBooked(true);
        break;
      case '12:00 PM':
        setIs12PMBooked(true);
        break;
      case '1:00 PM':
        setIs1PMBooked(true);
        break;
      default:
        break;
    }
  };

  // Available dates from tomorrow till next week
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const availableDates = [];
  const tempDate = new Date(today);
  while (tempDate < nextWeek) {
    const dateString = tempDate.toISOString().split('T')[0];
    availableDates.push(dateString);
    tempDate.setDate(tempDate.getDate() + 1);
  }

  const [isAppointmentConfirmed, setAppointmentConfirmed] = useState(false);

  // Function to handle appointment confirmation
  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
      // Perform any further actions here, such as saving the booking details to a database.
      setAppointmentConfirmed(true);
    } else {
      alert('Please select both date and time before confirming the appointment.');
    }
  };
  return (
    <div>
      <h1>Booking Details</h1>
      {selectedDoctor && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <h2>{selectedDoctor.doctorName}</h2>
          <p>Address: {selectedDoctor.address}</p>
          <p>Speciality: {selectedDoctor.speciality}</p>
          <div>
            <h3>Select Date:</h3>
            <select onChange={(e) => handleDateSelect(e.target.value)} value={selectedDate}>
              <option value="" disabled>Select a date</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          {selectedDate && (
            <div>
              <h3>Select Time:</h3>
              <select onChange={(e) => handleTimeSelect(e.target.value)} value={selectedTime}>
                <option value="" disabled>Select a time</option>
                {!is10AMBooked && <option value="10:00 AM">10:00 AM</option>}
                {!is11AMBooked && <option value="11:00 AM">11:00 AM</option>}
                {!is12PMBooked && <option value="12:00 PM">12:00 PM</option>}
                {!is1PMBooked && <option value="1:00 PM">1:00 PM</option>}
              </select>
            </div>
          )}
        </div>
      )}
        <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
              {isAppointmentConfirmed && <p>Appointment Confirmed! Thank you.</p>}
    </div>
  );
};

export default BookingsPage;
