import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function RoomTypeAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomtypes, setRoomType] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/RoomType/GetAllList"
      );
      setRoomType(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/RoomType/Add", {
        roomName: roomName,
      });
      showAndHideAlert("The room type has been successfully registered!");
      setId("");
      setRoomName("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function editRoomType(roomtype) {
    setRoomName(roomtype.roomName);
    setId(roomtype.id);
  }

  async function deleteRoomType(id) {
    try {
      await axios.delete(`https://localhost:7264/api/RoomType/Delete?Id=${id}`);
      showAndHideAlert("The room type has been successfully deleted!");
      setId("");
      setRoomName("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const roomtype = roomtypes.find((p) => p.id === id);
      await axios.put(
        `https://localhost:7264/api/RoomType/Update/${roomtype.id}`,
        {
          id: roomtype.id,
          roomName: roomName,
        }
      );
      showAndHideAlert("The room type has been successfully edited!");
      setId("");
      setRoomName("");
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
            <h4 className="description">Data for Room Types</h4>
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

                  <label className="label">RoomName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomName"
                    value={roomName}
                    onChange={(event) => {
                      setRoomName(event.target.value);
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

                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {roomtypes.map(function fn(roomtype) {
                    return (
                      <tr key={roomtype.id}>
                        <td>{roomtype.id}</td>
                        <td>{roomtype.roomName}</td>

                        <td className="d-flex align-items-center button-container ">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editRoomType(roomtype)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteRoomType(roomtype.id)}
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

export default RoomTypeAdmin;
