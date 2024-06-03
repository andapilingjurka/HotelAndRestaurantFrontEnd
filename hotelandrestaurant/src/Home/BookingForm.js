import React from "react";
import { useState, useEffect } from 'react';
import "./booking-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';
import StripeForm from '../components/Payment/StripeForm';
import Navbar from '../include/Nav';

const BookingForm = ({ id, price }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const [pickUpDate, setPickUpDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [dita, setDita] = useState(0);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const[description,setdescription]=useState('');
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [bookedDates, setBookedDates] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const token = localStorage.getItem('token');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
  let idktu;
  if (token) {
    idktu = decodeToken(token).nameid;
  }
 

  // setUserId(idktu)
  const isReservationValid = (pickUpDate, dropOffDate, bookedDates) => {
    let start = new Date(pickUpDate);
    let end = new Date(dropOffDate);

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
      if (!isReservationValid(pickUpDate, dropOffDate, bookedDates)) {
          alert('Selected dates are not available. Please choose different dates.');
          return;
      }

  // Handle payment method
  if (paymentMethod === "Cash") {
    navigate('/payment', { state: { total } });
  } else if (paymentMethod === "Stripe") {

    setShowPaymentForm(true);
  }


      // Proceed with making the reservation
      console.log('Reservation is valid, proceed with booking.');
      // Additional steps to submit the booking can be implemented here
  };
    
  

  useEffect(() => {
    // Function to calculate the sum and update the total state


    const calculateDays = () => {
      if (pickUpDate && dropOffDate) {
        const startDate = new Date(pickUpDate);
        const endDate = new Date(dropOffDate);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDita(daysDifference);


      } else {
        setDita(null); // Reset the number of days if dates are not valid
      }

      // e gjen datat e te cilat jon trezervume 
      const fetchBookedDates = async () => {
        try {
          const response = await axios.get(`https://localhost:7264/api/Bookings/BookedDates/${id}`);
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
          console.log("asdsad" + bookedDates)
        } catch (error) {
          console.error('Error fetching booked dates:', error);
        }
      };

      // e gjen datat e te cilat jon trezervume 
      fetchBookedDates();
    };


    calculateDays();

    const calculateTotal = () => {
      const sum = dita * price;
      setTotal(sum);

    };
    // Call calculateTotal whenever id or price changes
    calculateTotal();

  }, [dita, price, pickUpDate, dropOffDate]);

  // console.log(total)
  // console.log("Dita", dita)
  // console.log("Price", price)

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const saveReservation = async () => {
    if (!isReservationValid(pickUpDate, dropOffDate, bookedDates)) {
      alert('Selected dates are not available. Please choose different dates.');
      return;
    }
    if (dita <= 0) {
      alert("Pick up Date is Incorrect")
      return;
    }
    // try {
    //   const response = await axios.post("https://localhost:7112/api/Reservations/CalculateDiscountedPrice", {
        
 
    //   firstName: firstName,
    //   lasttName: lastName,
    //   pickUpDate: pickUpDate,
    //   dropOffDate: dropOffDate,
    //   phone: number,
    //   carID: id,
    //   priceDay: price,
    //   description: description,
    //   total: total,
    //   userId: idktu,
     
     
      
    
    // });

    
   
      // setDiscountedPrice(response.data);
      // navigate('/check', {
      //   state: {
      //     firstName: firstName,
      //     lasttName: lastName,
      //     pickUpDate: pickUpDate,
      //     dropOffDate: dropOffDate,
      //     phone: number,
      //     carID: id,
      //     priceDay: price,
      //     description: description,
      //     total: total,
      //     userId: idktu,
      //     discountedPrice: response.data,
          
      //   },
      // });
      
    // } catch (error) {
    //   console.error('Error calculating discount:', error);
    // }
    
  };
  const handlePaymentSuccess = async () => {
    
    alert('Payment successful! Thank you for your booking.');
    setPaymentSuccess(true);
    // Handle post-payment success actions here (e.g., navigate to confirmation page)

    try {
      const response = await axios.post("https://localhost:7264/api/Bookings/Add", {

        //qetu e osht per form nuk mundesh me rezervu nese nuk je i bom login
        name: firstName,
        lasttName: lastName,
        checkInDate: pickUpDate,
        checkOutDate: dropOffDate,
        roomId: id,
        toTal: total,
        userId: idktu,




      });
      alert("Rezervimi u be me sukses")
      navigate('/home')

      

    } catch (error) {
      console.error('Error calculating discount:', error);
    }
  };
  

  return (
    <div>
      <Navbar/>
      {!showPaymentForm && !paymentSuccess && (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>First Name </label>
        <input type="text"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label>Last Name </label>
        <input type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Pick Up Date: </label>
        <input
          type="date"
          value={pickUpDate}
          onChange={(e) => setPickUpDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label>Drop Off Date: </label>
        <input
          type="date"
          value={dropOffDate}
          onChange={(e) => setDropOffDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Number Of Days </label>
        <input type="number" value={dita} readOnly />
      </FormGroup>




      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label>Price for Day</label>
        <input type="number" placeholder="cmimi" defaultValue={price} readOnly />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Total</label>
        <input type="number" placeholder="Totali" defaultValue={total} readOnly />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">

        <input type="text" placeholder="id" defaultValue={id} hidden />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
       
       <input type="text" placeholder="id" defaultValue={id}  /> 
    </FormGroup>
  
    <FormGroup className="booking__form d-inline-block ms-1 mb-4">
  <label>Payment Method</label>
  <select
    className="rezervime-form-control"
    id="paymentMethod"
    value={paymentMethod}
    onChange={(event) => setPaymentMethod(event.target.value)}
  >
    <option value="">Select payment method</option>
    <option value="Cash">Cash</option>
    <option value="Stripe">Online Payment</option>
  </select>
</FormGroup>
     

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
      </FormGroup>
     

    






      {/* <div className="payment text-end mt-5">
        <button onClick={calculateDiscount}>Check</button>
      </div> */}
          <button onClick={handleReservationAttempt}>Book Now</button>
      <button onClick={saveReservation}>Book Now</button>
    </Form>
  // After your Form component
)}
{showPaymentForm && (
  <StripeForm 
    amount={total} 
    description={description}
    // After your Form component

    onSuccess={handlePaymentSuccess} 
  />
)}
</div>


  );
};

export default BookingForm;