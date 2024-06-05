import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stripe.css';
import paypal from './paypal.jpg'; // Import your image file
import axios from "axios";

const StripeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstName, lastName, pickUpDate, dropOffDate, total, description, idktu, id } = location.state;
  console.log("FIRS ASF "+ firstName)
  const handlePaymentSuccess = async () => {
    
    // alert('Payment successful! Thank you for your booking.');
    // setPaymentSuccess(true);
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
       //alert("Rezervimi u be me sukses")
      //  navigate('/home')
 
       
 
     } catch (error) {
       console.error('Error calculating discount:', error);
     }
   };

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
    email: '',
    currency: 'USD',
    description: description ? description.toString() : '',
    amount: total ? total.toString() : '',
  });

  useEffect(() => {
    setPaymentData((prevData) => ({
      ...prevData,
      amount: total ? total.toString() : '',
      description: description ? description.toString() : '',
    }));
  }, [total, description]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const clearForm = () => {
    setPaymentData({
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
      email: '',
      currency: 'USD',
      description: description ? description.toString() : '',
      amount: total ? total.toString() : '',
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7264/api/payment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert('Payment successful! Thank you for your booking.');
        clearForm();
        handlePaymentSuccess();
        navigate('/home'); // Redirect to home or any other page
      } else {
        console.error('Payment failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="payment-container mt-5">
        <img src={paypal} className="img-fluid" style={{ width: '75%' }} alt="Featured" />

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={paymentData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Card Number:</label>
            <div className="input-group">
              <input
                type="text"
                name="cardNumber"
                className="form-control"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
              />
              <label className="input-group-text">Card Number</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Expiration Month </label>
            <input
              type="number"
              name="expirationMonth"
              className="form-control"
              value={paymentData.expirationMonth}
              onChange={handleInputChange}
              min="1"
              max="12"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Expiration Year</label>
            <input
              type="number"
              name="expirationYear"
              className="form-control"
              value={paymentData.expirationYear}
              onChange={handleInputChange}
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 5}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">CVC:</label>
            <input
              type="text"
              name="cvc"
              className="form-control"
              value={paymentData.cvc}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              name="description"
              value={paymentData.description}
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="text"
              name="amount"
              value={paymentData.amount}
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Currency:</label>
            <input
              type="text"
              name="currency"
              className="form-control"
              value={paymentData.currency}
              readOnly
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default StripeForm;