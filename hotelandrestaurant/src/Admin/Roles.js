import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Admin/style.css";
import Sidebar from "./include/Sidebar";
import Nav from "./include/Nav";
import { Link, useNavigate } from "react-router-dom";

function Roles() {
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRolet] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Roles/GetAllList"
      );
      setRolet(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Roles/Add", {
        name: name,
        description: description,
      });
      showAndHideAlert("Roli është regjistruar me sukses!");
      setId("");
      setName("");
      setDescription("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function editRoli(role) {
    setName(role.name);
    setId(role.id);
    setDescription(role.description);
  }

  async function deleteRoli(id) {
    try {
      await axios.delete(`https://localhost:7264/api/Roles/Delete?Id=${id}`);
      showAndHideAlert("Roli është fshir me sukses!");
      setId("");
      setName("");
      setDescription("");
      Load();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const roles = role.find((p) => p.id === id);
      await axios.put(`https://localhost:7264/api/Roles/Update/${roles.id}`, {
        id: roles.id,
        name: name,
        description: description,
      });
      showAndHideAlert("Roli është edituar me sukses!");
      setId("");
      setName("");
      setDescription("");
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
            <h4 className="description">Data for roles</h4>
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
                      setName(event.target.value);
                    }}
                  />
                  <label className="label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
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
                    <th scope="col">Description</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {role.map(function fn(shteti) {
                    return (
                      <tr key={shteti.id}>
                        <td>{shteti.id}</td>
                        <td>{shteti.name}</td>
                        <td>{shteti.description}</td>

                        <td className="d-flex align-items-center button-container ">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => editRoli(shteti)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => deleteRoli(shteti.id)}
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

export default Roles;
