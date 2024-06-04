import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from "react-router-dom";
//import { decodeToken } from "../components/LoginRegister/jwtUtils";

function BookingsAdmin() {
  const [toggle, setToggle] = useState(true);
  //   const token = localStorage.getItem("token");
  //   const decodedToken = decodeToken(token);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [guestId, setGuestId] = useState("");
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [isAscending, setIsAscending] = useState(true);
  useEffect(() => {
    (async () => {
      await loadRooms();
      await loadGuests();
      await loadBookings();
    })();
  }, []);

  async function loadRooms() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Room/GetAllList"
      );
      setRooms(result.data);
    } catch (err) {
      console.error("Error loading rooms:", err);
    }
  }
  async function loadGuests() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Guests/GetAllList"
      );
      setGuests(result.data);
    } catch (err) {
      console.error("Error loading guests:", err);
    }
  }

  async function loadBookings() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Bookings/GetAllList"
      );
      setBookings(result.data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  }

  const inputFileRef = useRef(null);

  function clearForm() {
    setId("");
    setPrice("");
    setCurrency("");
    setCheckInDate("");
    setCheckOutDate("");
    setRoomId("");
    setGuestId("");

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }
 //filtering
 async function load() {
  try {
    const result = await axios.get(
      "https://localhost:7264/api/Bookings/GetAllFiltering",
      { params: { searchQuery, sortField, isAscending } }
    );
    setBookings(result.data);
  } catch (err) {
    console.error("Error loading cities:", err);
  }
}
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Bookings/Add", {
        price: price,
        currency: currency,
        roomId: roomId,
        guestId: guestId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      });
      showAndHideAlert("Guest has been successfully registered!");
      setId("");
      setPrice("");
      setCurrency("");
      setCheckInDate("");
      setCheckOutDate("");
      setRoomId("");
      setGuestId("");
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }
  async function editBooking(booking) {
    setId(booking.id);
    setPrice(booking.price);
    setCurrency(booking.currency);
    setRoomId(booking.roomId);
    setGuestId(booking.guestId);
    setCheckInDate(new Date(booking.checkInDate).toISOString().split("T")[0]);
    setCheckOutDate(new Date(booking.checkOutDate).toISOString().split("T")[0]);
  }

  async function deleteBooking(bookingId) {
    try {
      console.log("Deleting reservation with ID:", bookingId);
      await axios.delete(
        `https://localhost:7264/api/Bookings/Delete?Id=${bookingId}`
      );
      showAndHideAlert("Rezervimi është fshir me sukses!");
      clearForm();
      loadBookings();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const booking = bookings.find((p) => p.id === id);
      await axios.put(
        `https://localhost:7285/api/Bookings/Update/${booking.id}`,
        {
          id: booking.id,
          price: price,
          currency: currency,
          roomId: roomId,
          guestId: guestId,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        }
      );
      showAndHideAlert("Rezervimi është edituar me sukses!");
      clearForm();
      loadBookings();
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
  //   // Kushti per kontrollimin nese eshte admin
  //   if (!decodedToken || decodedToken.role !== "admin") {
  //     return (
  //       <div className="container">
  //         <h1
  //           style={{
  //             textAlign: "center",
  //             fontFamily: "Times New Roman, serif",
  //             fontWeight: "bold",
  //             position: "relative",
  //             marginTop: "250px",
  //           }}
  //         >
  //           Ju nuk keni akses në këtë faqe!
  //         </h1>
  //       </div>
  //     );
  //   }

  function handleSearch(event) {
    event.preventDefault();
    load();
  }
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#3f4345",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}

        <div className="col-4 col-md-2"></div>
        <div className="col">
          <Nav Toggle={Toggle} />

          <div>
            <h4 className="description">Të dhënat për Rezervime</h4>
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
                </div>
                <div className="form-group">
                  <label className="label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label mr-4" style={{ marginRight: "10px" }}>
                    Currency
                  </label>
                  <div className="form-check form-check-inline ml-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="eurCheckbox"
                      checked={currency === "EUR"}
                      onChange={() => setCurrency("EUR")}
                    />
                    <label
                      className="form-check-label white-text"
                      htmlFor="eurCheckbox"
                      style={{ color: "white" }}
                    >
                      EUR
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="usdCheckbox"
                      checked={currency === "USD"}
                      onChange={() => setCurrency("USD")}
                    />
                    <label
                      className="form-check-label white-text"
                      htmlFor="usdCheckbox"
                      style={{ color: "white" }}
                    >
                      USD
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">CheckIn Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(event) => {
                      setCheckInDate(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="label">CheckOut Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(event) => {
                      setCheckOutDate(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Room</label>
                  <select
                    style={{ color: "black" }}
                    className="form-control"
                    id="roomId"
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                  >
                    <option value="" style={{ color: "black" }}>
                      Select a Room
                    </option>
                    {rooms.map((room) => (
                      <option
                        key={room.id}
                        value={room.id}
                        style={{ color: "black" }}
                      >
                        {room.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Guest</label>
                  <select
                    style={{ color: "black" }}
                    className="form-control"
                    id="guestId"
                    value={guestId}
                    onChange={(event) => setGuestId(event.target.value)}
                  >
                    <option value="" style={{ color: "black" }}>
                      Select a Guest
                    </option>
                    {guests.map((guest) => (
                      <option
                        key={guest.id}
                        value={guest.id}
                        style={{ color: "black" }}
                      >
                        {guest.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="btn btn-success m-4 button" onClick={save}>
                    Save
                  </button>
                  <button
                    className="btn btn-warning m-4 button"
                    onClick={update}
                  >
                    Update
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
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Totali</th>
                    <th scope="col">CheckIn Date</th>
                    <th scope="col">CheckOut Date</th>
                    <th scope="col">RoomID</th>
                    <th scope="col" className="px-3">UserID</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.name}</td>
                      <td>{booking.lastName}</td>
                      <td>{booking.toTal}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>{booking.roomId}</td>
                      <td>{booking.userId}</td>
                      <td>
                        <div className="button-container">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editBooking(booking)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsAdmin;
