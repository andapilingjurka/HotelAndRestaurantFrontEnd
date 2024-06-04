import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function RoomAdmin() {
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [roomtypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Shtoni një state për të mbajtur emrin e RoomType të zgjedhur
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [noDataMessage, setNoDataMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    (async () => {
      await loadRoomTypes();
      await loadRooms();
    })();
  }, []);

  async function loadRoomTypes() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/RoomType/GetAllList"
      );
      setRoomTypes(result.data);
    } catch (err) {
      console.error("Error loading roomtype:", err);
    }
  }

  async function loadRooms() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Room/GetAllList"
      );
      // Sorto listën e dhomave sipas numrit të dhomës (RoomNumber)
      const sortedRooms = result.data.sort((a, b) =>
        a.roomNumber > b.roomNumber ? 1 : -1
      );
      setRooms(sortedRooms);
    } catch (err) {
      console.error("Error loading rooms:", err);
    }
  }

  const inputFileRef = useRef(null);

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Room/Add", {
        roomNumber: roomNumber,
        status: status,
        image: image,
        price: price,
        description: description,
        roomTypeId: roomTypeId,
      });
      showAndHideAlert("The room has been successfully registered!");
      clearForm();
      loadRooms();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }
 //filtering
 async function load() {
  try {
    const result = await axios.get(
      "https://localhost:7264/api/Room/GetAllFiltering",
      { params: { searchQuery, sortField, isAscending } }
    );
    setRooms(result.data);
  } catch (err) {
    console.error("Error loading cities:", err);
  }
}
  function clearForm() {
    setId("");
    setRoomNumber("");
    setStatus("");
    setImage("");
    setPrice("");
    setDescription("");
    setRoomTypeId("");

    setSelectedImage(null);
    inputFileRef.current.value = "";
  }

  async function editRooms(room) {
    setRoomNumber(room.roomNumber);
    setStatus(room.status);
    setImage(room.image);
    setSelectedImage(room.image);
    setPrice(room.price);
    setDescription(room.description);
    setRoomTypeId(room.roomTypeId);
    setId(room.id);
  }

  async function deleteRooms(roomId) {
    try {
      await axios.delete(`https://localhost:7264/api/Room/Delete?Id=${roomId}`);
      showAndHideAlert("The room has been successfully deleted!");
      clearForm();
      loadRooms();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const room = rooms.find((p) => p.id === id);
      await axios.put(`https://localhost:7264/api/Room/Update/${room.id}`, {
        id: room.id,
        roomNumber: roomNumber,
        status: status,
        image: image,
        price: price,
        description: description,
        roomTypeId: roomTypeId,
      });
      showAndHideAlert("The room has been successfully edited!");
      clearForm();
      loadRooms();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  // Shtoni një funksion për të gjetur ID-në e RoomType bazuar në emrin e zgjedhur
  function findRoomTypeIdByName(roomName) {
    const selectedRoom = roomtypes.find((room) => room.roomName === roomName);
    return selectedRoom ? selectedRoom.id : "";
  }

  // Shtoni një funksion për të ngarkuar dhomat bazuar në emrin e zgjedhur të RoomType
  async function loadRoomsByRoomType(roomName) {
    try {
      let result;
      if (roomName === "All") {
        result = await axios.get("https://localhost:7264/api/Room/GetAllList");
        setRooms(result.data); // Përditësoni drejtpërdrejt listën e dhomave
      } else {
        result = await axios.get(
          `https://localhost:7264/api/Room/GetRoomsByRoomType?roomTypeName=${roomName}`
        );
        setRooms(result.data);
      }
      if (result.data.length === 0) {
        setNoDataMessage("There is no data for this Room Type!");
      } else {
        setNoDataMessage("");
      }
    } catch (err) {
      console.error("Error loading rooms:", err);
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
            <h4 className="description">Data for Rooms</h4>
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

                  <label className="label">RoomNumber</label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomNumber"
                    value={roomNumber}
                    onChange={(event) => {
                      setRoomNumber(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(event) => {
                      setStatus(event.target.value);
                    }}
                  >
                    <option value="">Select Options</option>
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Inspected">Inspected</option>
                    <option value="DoNotDisturb">DoNotDisturb</option>
                    <option value="CheckedOut">CheckedOut</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Image</label>
                  <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control"
                    id="image"
                    onChange={(event) => {
                      setSelectedImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                      setImage("/images/rooms/" + event.target.files[0].name);
                    }}
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "150px",
                        marginTop: "10px",
                      }}
                      alt="SelectedImagePreview"
                    />
                  )}
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
                  <label className="label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="label">RoomType</label>
                  <select
                    className="form-control"
                    id="roomType"
                    value={roomTypeId}
                    onChange={(event) => setRoomTypeId(event.target.value)}
                  >
                    <option value="">Select Options</option>
                    {roomtypes.map((roomtype) => (
                      <option key={roomtype.id} value={roomtype.id}>
                        {roomtype.roomName}
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

            <select
              className="filter"
              value={selectedRoomType}
              onChange={(event) => {
                setSelectedRoomType(event.target.value);
                loadRoomsByRoomType(event.target.value); // Thirrni funksionin për të ngarkuar dhomat pasi të zgjidhni një RoomType
              }}
            >
              <option value="">Filter</option>
              <option value="All">All</option>
              {roomtypes.map((roomtype) => (
                <option key={roomtype.id} value={roomtype.roomName}>
                  {roomtype.roomName}
                </option>
              ))}
            </select>
            <div className="table-responsive m-3">
              {noDataMessage && (
                <p className="text-danger text-bold">{noDataMessage}</p>
              )}
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">RoomNumber</th>
                    <th scope="col">Status</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">RoomType</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(function fn(room) {
                    return (
                      <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomNumber}</td>
                        <td>{room.status}</td>
                        <td>
                          <img
                            src={room.image}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "150px",
                            }}
                            alt="RoomPhoto"
                          />
                        </td>
                        <td>{room.price}</td>
                        <td>{room.description}</td>
                        <td>{room.roomType.roomName}</td>
                        <td>
                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-warning mx-1 button"
                              onClick={() => editRooms(room)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-1 button"
                              onClick={() => deleteRooms(room.id)}
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

export default RoomAdmin;
