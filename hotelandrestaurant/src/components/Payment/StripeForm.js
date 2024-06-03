import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stripe.css';
import paypal from './paypal.jpg'; // Import your image file


const StripeForm = ({ amount, description, currency, onSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
    email: '',
    currency:  'USD',
    description: description ? description.toString() : '',
    amount: amount ? amount.toString() : '',
  });

  useEffect(() => {
    setPaymentData((prevData) => ({
      ...prevData,
      amount: amount ? amount.toString() : '',
      description: description ? description.toString() : '',
    }));
  }, [amount, description]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
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
        onSuccess();
      } else {
        console.error('Payment failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  
  return (
   <div> 
  <form onSubmit={handleFormSubmit} className="payment-container mt-5 ">
    <img src={paypal} className="img-fluid" style={{ width: '75%' }} alt="Featured" />

     <div className="row">
     <div className="col-md-6 mb-3">
     <label className="form-labeel">Email:</label>
     <input
     type="text"
     name="email"
    className="form-controol"
    onChange={handleInputChange}
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-labeel">Card Number:</label>
<div className="input-group">
  <input
    type="text"
    name="cardNumber"
    className="form-controol"
    onChange={handleInputChange}
  />
  <label className="input-group-text">Card Number</label>
</div>
</div>

<div className="col-md-6 mb-3">
<label className="form-labeel">Expiration Month </label>
<input
  type="number"
  name="expirationMonth"
  className="form-controol"
  onChange={handleInputChange}
  min="1"
  max="12"
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-labeel">Expiration Year</label>
<input
  type="number"
  name="expirationYear"
  className="form-controol"
  onChange={handleInputChange}
  min={new Date().getFullYear()}
  max={new Date().getFullYear() + 5}
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-labeel">CVC:</label>
<input
  type="text"
  name="cvc"
  className="form-controol"
  onChange={handleInputChange}
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-labeel">Description:</label>
<input
  type="text"
  name="description"
  value={paymentData.description}
  className="form-controol"
  readOnly
/>
</div>



<div className="col-md-6 mb-3">
<label className="form-labeel">Amount:</label>
<input
  type="text"
  name="amount"
  value={paymentData.amount}
  className="form-controol"
  readOnly
/>
</div>

{/* Existing Description, Currency, and Amount Inputs (read-only) */}
<div className="col-md-6 mb-3">
<label className="form-labeel">Currency:</label>
<input
  type="text"
  name="currency"
  className="form-controol"
  value={paymentData.currency} 

  
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