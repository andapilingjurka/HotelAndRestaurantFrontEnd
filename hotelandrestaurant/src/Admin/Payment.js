import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Pagesa.css";

//import MyNavbar from "../include/Navbar";
//import Footer from "../include/Footer";

function Payment() {
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem('token');
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const [bookingID, setBookingID] = useState("");
  const [bookings, setBookings] = useState([]);
  const [payments, setPayment] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    (async () => {
      await loadBooking();
      await loadPayment();
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

  async function loadPayment() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Payment/GetAllList",
        { params: { searchQuery, sortField, isAscending } }
      );
      setPayment(result.data);
    } catch (err) {
      console.error("Error loading cities:", err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Payment/AddPayment", {
        name: name,
        surname: surname,
        phone: phone,
        date:date,
        amount: amount,
        bookingID: bookingID,
      });
      showAndHideAlert("The payment has been successfully registered!");
      clearForm();
      loadPayment();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setSurname("");
    setDate("");
    setPhone("");
    setAmount("");
    setBookingID("");
  }

  async function editPayment(payment) {
    setName(payment.name);
    setSurname(payment.surname);
    setDate(payment.date);
    setPhone(payment.phone);
    setAmount(payment.amount);
    setBookingID(payment.bookingID);
    setId(payment.id);
  }

  async function deletePayment(paymentId) {
    try {
      await axios.delete(
        `https://localhost:7264/api/Payment/Delete?Id=${paymentId}`
      );
      showAndHideAlert("The payment has been successfully deleted!");
      clearForm();
      loadPayment();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const payment = payments.find((p) => p.id === id);
      await axios.put(`https://localhost:7264/api/Payment/Update/${payment.id}`, {
        id: payment.id,
        name: name,
        surname: surname,
        phone: phone,
        date: date,
        amount: amount,
        bookingID: bookingID,
      });
      showAndHideAlert("The payment has been successfully edited!");
      clearForm();
      loadPayment();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function showAndHideAlert(message, isError = false) {
    setAlertMessage(message);
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
  }

  async function handleReservationChange(event) {
    const selectedbookingID = event.target.value;
    const selectedBooking = bookings.find(booking => booking.id === selectedbookingID);

    if (selectedBooking) {
      setAmount(selectedBooking.amount);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    loadPayment();
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#004687",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
          </div>
        )}

        <div className="col-4 col-md-2"></div>
        <div className="col">
          <div>
            <h4 className="description">Payment information</h4>
            <div className="container mt-4">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    hidden
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                  />

                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emri"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mbiemri"
                    value={surname}
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="telefoni"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />
                </div>

               

                <div className="form-group">
                  <label className="label">Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shuma"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                    }}
                  />
                </div>

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
                <div>
                  <button className="btn btn-success m-4 button" onClick={save}>
                    Ruaj
                  </button>
                  <button
                    className="btn btn-warning m-4 button"
                    onClick={update}
                  >
                    Përditëso
                  </button>
                </div>
              </form>
            </div>
            <br></br>
            
            {/* Search and Sort Controls */}
            <div className="container mt-4">
              <form onSubmit={handleSearch}>
                <div className="form-group">
                  <label className="label">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Order by:</label>
                  <select
                    className="form-control"
                    value={sortField}
                    onChange={(event) => setSortField(event.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="surname">Surname</option>
                    <option value="date">Date</option>
                    <option value="phone">Phone</option>
                    <option value="amount">Amount</option>
                    <option value="bookingID">BookingID</option>
                  </select>
                </div>
               
                <button type="submit" className="btn btn-primary">
                Search
                </button>
              </form>
            </div>

            {/* Alert Message */}
            {isAlertVisible && (
              <div
                className={`alert ${
                  alertMessage.includes("Error")
                    ? "alert-danger"
                    : "alert-success"
                }`}
              >
                {alertMessage}
              </div>
            )}

            <div className="table-responsive m-3">
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Opsionet</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(function fn(payment) {
                    return (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.name}</td>
                        <td>{payment.surname}</td>
                        <td>{payment.phone}</td>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.bookingID}</td>
                        <td>
                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-warning mx-1 button"
                              onClick={() => editPayment(payment)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-1 button"
                              onClick={() => deletePayment(payment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;