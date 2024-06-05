import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import './payment.css';
import { useLocation } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const { firstName, lastName, pickUpDate, dropOffDate, total, description, idktu, id } = location.state;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(total); // Initialize amount from total

    const [bookingID, setBookingID] = useState("");
    const [bookings, setBookings] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        (async () => {
          await loadBooking();
        })();
      }, []);
    
      async function loadBooking() {
        try {
          const result = await axios.get(
            "https://localhost:7264/api/Bookings/GetAllList"
          );
          setBookings(result.data);
        } catch (err) {
          console.error("Error loading states:", err);
        }
      }
    const clearForm = () => {
        setName("");
        setSurname("");
        setPhone("");
        setDate("");
        setAmount("");
        setBookingID("");
    };

    const showAndHideAlert = (message, isError = false) => {
        setAlertMessage(message);
        setIsAlertVisible(true);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    };

    const handlePaymentSuccess = async () => {
    
        // alert('Payment successful! Thank you for your booking.');
        // setPaymentSuccess(true);
         // Handle post-payment success actions here (e.g., navigate to confirmation page)
            console.log("test UBT")
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
          //  navigate('/home')
     
           
     
         } catch (error) {
           console.error('Error calculating discount:', error);
         }
       };
    

    async function handleReservationChange(event) {
        const selectedbookingID = event.target.value;
        const selectedBooking = bookings.find(booking => booking.id === selectedbookingID);
    
      
      }

    const save = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://localhost:7264/api/Payment/AddPayment", {
                name,
                surname,
                phone,
                date,
                amount: total.toString(), // Convert total to string before sending
                bookingID,
            });
            showAndHideAlert("The payment has been successfully registered!");
            clearForm();
            handlePaymentSuccess();
            // Optionally reload payments or perform any other necessary actions
        } catch (err) {
            showAndHideAlert(`Error: ${err}`, true);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    {isAlertVisible && (
                        <Alert variant={alertMessage.includes("Error") ? "danger" : "success"}>
                            {alertMessage}
                        </Alert>
                    )}
                    <Form className="payment-form" onSubmit={save}>
                        <h4>Payment Form</h4>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Select date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={amount} // Display the total amount in the field
                                readOnly // Make the field read-only
                            />
                        </Form.Group>

                        <div className="form-group">
                  <label className="label">Booking Name</label>
                  <select
                    className="form-control"
                    id="rezervimiID"
                    value={bookingID}
                    onChange={(event) => {
                      setBookingID(event.target.value);
                      handleReservationChange(event);
                    }}
                  >
                    <option value="">Choose Booking Name</option>
                    {bookings.map((booking) => (
                      <option key={booking.id} value={booking.id}>
                        {booking.name}
                      </option>
                    ))}
                  </select>
                </div>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Payment;