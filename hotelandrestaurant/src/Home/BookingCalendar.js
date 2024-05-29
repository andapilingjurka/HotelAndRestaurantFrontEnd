import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function BookingCalendar({ roomId }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
               // const response = await axios.get(`https://localhost:7264/api/Bookings/BookedDates/1`);
               const response = await axios.get(`https://localhost:7264/api/Bookings/BookedDates/${roomId}`);
                const bookedDates = response.data.map(booking => {
                    const start = new Date(booking.checkIn);
                    const end = new Date(booking.checkOut);
                    const dates = [];
                    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
                        dates.push(new Date(dt));
                    }
                    return dates;
                }).flat();  
                setBookedDates(bookedDates);
                console.log("asdsad"+bookedDates)
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, []);


    const isReservationValid = (startDate, endDate, bookedDates) => {
        let start = new Date(startDate);
        let end = new Date(endDate);

        // Normalize dates to remove time part
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        // Check if any booked date falls between the start and end dates
        for (let date of bookedDates) {
            let bookedDate = new Date(date);
            bookedDate.setHours(0, 0, 0, 0);
            if (bookedDate >= start && bookedDate <= end) {
                return false; // Invalid reservation as it overlaps with a booked date
            }
        }
        return true; // Valid reservation
    };

    const handleReservationAttempt = () => {
        if (!isReservationValid(startDate, endDate, bookedDates)) {
            alert('Selected dates are not available. Please choose different dates.');
            return;
        }
        // Proceed with making the reservation
        console.log('Reservation is valid, proceed with booking.');
        // Additional steps to submit the booking can be implemented here
    };
    
    return (
        <div>
             
            {/* <div>
                <label>Check-in Date:</label>
                <DatePicker selected={startDate} onChange={setStartDate} />
            </div>
            <div>
                <label>Check-out Date:</label>
                <DatePicker selected={endDate} onChange={setEndDate} />
            </div> */}
             {/* <button onClick={handleReservationAttempt}>Book Now</button> */}
            <h3>Select a Date</h3>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                highlightDates={[{
                    "react-datepicker__day--highlighted-custom-1": bookedDates
                }]}
                inline
            />
            <style>{`
                .react-datepicker__day--highlighted-custom-1 {
                    background-color: lightcoral;
                    color: white;
                }
            `}</style>
           
        </div>
    );
}

export default BookingCalendar;
