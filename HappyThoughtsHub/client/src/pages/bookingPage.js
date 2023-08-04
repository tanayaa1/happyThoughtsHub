// // BookingsPage.js
// import React from 'react';
 import bookingsData from './bookingsData.json';
// import { useState,useEffect} from 'react';
// import { useAuthContext } from "../hooks/useAuthContext";
// const BookingsPage = () => {
//   // Assuming you are using React Router for navigation, you can access the selectedDoctor using URL params or Redux state.
//   // For simplicity, we'll directly access the first item in the bookingsData array.
//   const selectedDoctor = bookingsData[0];
//   const { user } = useAuthContext();
//   const bookAppointment = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user?.id, // Replace with the actual user ID
//           date: selectedDate,
//           time: selectedTime,
//         }),
//       });

//       if (response.ok) {
//         // Handle successful booking
//         setAppointmentConfirmed(true);
//       } else {
//         // Handle booking failure
//         alert('Failed to book the appointment. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       alert('An error occurred while booking the appointment. Please try again later.');
//     }
//   };



//   const [bookings, setBookings] = useState([]);


//   // State for selected date and time
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   useEffect(() => {
//     if (selectedDate) {
//       fetchBookings(selectedDate); // Replace this with your actual API endpoint for fetching bookings
//     }
//   }, [selectedDate]);


//   // State for tracking booked times
//   const [is10AMBooked, setIs10AMBooked] = useState(false);
//   const [is11AMBooked, setIs11AMBooked] = useState(false);
//   const [is12PMBooked, setIs12PMBooked] = useState(false);
//   const [is1PMBooked, setIs1PMBooked] = useState(false);

//   // Helper function to reset time selection for a new date
//   const resetTimeSelection = () => {
//     setSelectedTime(null);
//     setIs10AMBooked(false);
//     setIs11AMBooked(false);
//     setIs12PMBooked(false);
//     setIs1PMBooked(false);
//   };

//   // Handle date selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     resetTimeSelection();
//   };
//   const fetchBookings = async (date) => {
//     try {
//       // Perform the GET request to fetch bookings for the selected date
//       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//       const response = await fetch(`http://localhost:4000/api/bookings?date=${date}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch bookings');
//       }
//       const data = await response.json();
//       setBookings(data);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };


//   // Handle time selection
//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//     // Set the corresponding boolean to true to mark the time as booked
//     switch (time) {
//       case '10:00 AM':
//         setIs10AMBooked(true);
//         break;
//       case '11:00 AM':
//         setIs11AMBooked(true);
//         break;
//       case '12:00 PM':
//         setIs12PMBooked(true);
//         break;
//       case '1:00 PM':
//         setIs1PMBooked(true);
//         break;
//       default:
//         break;
//     }
//   };
//   const getAvailableTimeSlots = () => {
//     const bookedTimes = bookings.map((booking) => booking.time);
//     const availableTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
//     return availableTimeSlots.filter((time) => !bookedTimes.includes(time));
//   };


//   // Available dates from tomorrow till next week
//   const today = new Date();
//   const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
//   const availableDates = [];
//   const tempDate = new Date(today);
//   while (tempDate < nextWeek) {
//     const dateString = tempDate.toISOString().split('T')[0];
//     availableDates.push(dateString);
//     tempDate.setDate(tempDate.getDate() + 1);
//   }

//   const [isAppointmentConfirmed, setAppointmentConfirmed] = useState(false);

//   // Function to handle appointment confirmation
//   const handleConfirmAppointment = () => {
//     if (selectedDate && selectedTime) {
//       // Perform the POST request to book the appointment
//       bookAppointment();
//     } else {
//       alert('Please select both date and time before confirming the appointment.');
//     }
//   };
// return (
//     <div>
//       <h1>Booking Details</h1>
//       {selectedDoctor && (
//         <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
//           <h2>{selectedDoctor.doctorName}</h2>
//           <p>Address: {selectedDoctor.address}</p>
//           <p>Speciality: {selectedDoctor.speciality}</p>
//           <div>
//             <h3>Select Date:</h3>
//             <select onChange={(e) => handleDateSelect(e.target.value)} value={selectedDate}>
//               <option value="" disabled>Select a date</option>
//               {availableDates.map((date) => (
//                 <option key={date} value={date}>
//                   {date}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           {selectedDate && (
//         <div>
//           <h3>Select Time:</h3>
//           <select onChange={(e) => handleTimeSelect(e.target.value)} value={selectedTime}>
//             <option value="" disabled>Select a time</option>
//             {getAvailableTimeSlots().map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>)}
//         </div>
//       )}
//         <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
//               {isAppointmentConfirmed && <p>Appointment Confirmed! Thank you.</p>}
//     </div>
//   );
// };

// export default BookingsPage;
// BookingsPage.js
import React from 'react';
import { useState, useEffect } from 'react';
// { useAuthContext } from "../hooks/useAuthContext";

const BookingsPage = () => {
  //const { user } = useAuthContext();
  const [selectedDoctor] = useState(bookingsData[0]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isAppointmentConfirmed, setAppointmentConfirmed] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchBookings(selectedDate);
    }
    
  }, [selectedDate]);

  const fetchBookings = async (date) => {
   // console.log(user.token);
    try {
      const response = await fetch(`http://localhost:4000/api/bookings?date=${date}`,{
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
    const availableTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
    return availableTimeSlots.filter((time) => !bookedTimes.includes(time));
  };

  const handleConfirmAppointment = async () => {
    if (selectedDate && selectedTime) {
      try {
        const response = await fetch('http://localhost:4000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           // userId: user?.id,
           userId:"64cca937203b07493fca402e",
            date: selectedDate,
            time: selectedTime,
          }),
        });

        if (response.ok) {
          setAppointmentConfirmed(true);
        } else {
          alert('Failed to book the appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('An error occurred while booking the appointment. Please try again later.');
      }
    } else {
      alert('Please select both date and time before confirming the appointment.');
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
                {getAvailableTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
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

