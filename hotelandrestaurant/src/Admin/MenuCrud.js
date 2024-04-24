import { useEffect, useState, useRef } from "react";
import axios from "axios";
import React from "react";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import "../components/Menu/menu.css";
import { Link, useNavigate } from "react-router-dom";

function MenuCrud() {
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [menu, setMenu] = useState([]);
  const [id, setId] = useState("");

  const [foodID, setFoods] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("https://localhost:7264/api/Menu");
      setMenu(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Menu ", {
        id: id,
        foodID: foodID,
      });
      alert("Save successful!");
      resetForm();
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7264/api/Menu/${id}`, {
        id: id,
        foodID: foodID,
      });
      alert("The Menu has been successfully edited.");
      resetForm();
      Load();
    } catch (err) {
      console.log(`Error: ${err}`, true);
    }
  }
  async function edit(menu) {
    setId(menu.id);
    setFoods(menu.foodID);
    console.log(`Update the Menu`);
  }

  async function Delete(id) {
    try {
      await axios.delete(`https://localhost:7264/api/Menu/${id}`);
      alert("The menu has been successfully deleted!");
      Load();
    } catch (err) {
      console.error("Error while deleting menu:", err);
      alert(`Error: ${err}`);
    }
  }

  function resetForm() {
    setId("");
    setFoods("");
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
            <h4 className="description">Data for Menu</h4>
            <div className="container mt-4"></div>
            <form>
              <div className="form-group">
                <label className="label">Food Id</label>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  name="food"
                  value={foodID}
                  onChange={(e) => setFoods(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-success m-4 button" onClick={save}>
                  {" "}
                  Save{" "}
                </button>
                <button className="btn btn-warning m-4 button" onClick={update}>
                  {" "}
                  Update{" "}
                </button>
              </div>
            </form>

            <div className="table-responsive m-3">
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Food ID</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((menu) => (
                    <tr key={menu.id}>
                      <td>{menu.id}</td>
                      <td>{menu.foodID}</td>
                      <td>
                        <div className="button-container">
                          <button
                            type="button"
                            className="btn btn-warning mx-1 button"
                            onClick={() => edit(menu)}
                          >
                            {" "}
                            Edit{" "}
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => Delete(menu.id)}
                          >
                            {" "}
                            Delete{" "}
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

export default MenuCrud;
