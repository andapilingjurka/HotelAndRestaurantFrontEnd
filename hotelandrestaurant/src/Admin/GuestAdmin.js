import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function GuestAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const[guests,setGuest]=useState([]);
  const [name, setGuestName] = useState("");
  const [lastName, setGuestLastName] = useState("");
  const [email, setGuestEmail] = useState("");
  const [phone, setGuestPhone] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Guests/GetAllList"
      );
      setGuest(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }
 //filtering
 async function load() {
  try {
    const result = await axios.get(
      "https://localhost:7264/api/Guests/GetAllFiltering",
      { params: { searchQuery, sortField, isAscending } }
    );
    setGuest(result.data);
  } catch (err) {
    console.error("Error loading cities:", err);
  }
}
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Guests/Add", {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
      });
      showAndHideAlert("Guest has been successfully registered!");
      setId("");
      setGuestName("");
      setGuestLastName("");
      setGuestEmail("");
      setGuestPhone("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function editGuest(guest) {
    setGuestName(guest.name);
    setGuestLastName(guest.lastName);
    setGuestEmail(guest.email);
    setGuestPhone(guest.phone);
    setId(guest.id);
  }

  async function deleteGuest(id) {
    try {
      await axios.delete(`https://localhost:7264/api/Guests/Delete?Id=${id}`);
      showAndHideAlert("Guest has been successfully deleted!");
      setId("");
      setGuestName("");
      setGuestLastName("");
      setGuestEmail("");
      setGuestPhone("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const guest = guests.find((p) => p.id === id);
      await axios.put(
        `https://localhost:7264/api/Guests/Update/${guest.id}`,
        {
          id: guest.id,
          name: name,
          lastName:lastName,
          phone:phone,
          email:email,
        }
      );
      showAndHideAlert("Guest details have been successfully edited!");
      setId("");
      setGuestName("");
      setGuestLastName("");
      setGuestEmail("");
      setGuestPhone("");
      Load();
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

  function handleSearch(event) {
    event.preventDefault();
    load();
  }

  ///////////////////////////////////////////////////////////////
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
            <h4 className="description">Data for Guests</h4>
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
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setGuestName(event.target.value);
                    }}
                  />
                   <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => {
                      setGuestLastName(event.target.value);
                    }}
                  />
                   <label className="label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(event) => {
                      setGuestPhone(event.target.value);
                    }}
                  />
                   <label className="label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setGuestEmail(event.target.value);
                    }}
                  />
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
                    <th scope="col">Name</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>

                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map(function fn(guest) {
                    return (
                      <tr key={guest.id}>
                        <td>{guest.id}</td>
                        <td>{guest.name}</td>
                        <td>{guest.lastName}</td>
                        <td>{guest.email}</td>
                        <td>{guest.phone}</td>

                        <td className="d-flex align-items-center button-container ">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editGuest(guest)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteGuest(guest.id)}
                          >
                            Delete
                          </button>
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

export default GuestAdmin;