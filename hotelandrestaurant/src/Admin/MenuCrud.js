import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import "../components/Menu/menu.css";

function MenuCrud() {
  const [toggle, setToggle] = useState(true);
  const [menu, setMenu] = useState([]);
  const [id, setId] = useState("");
  const [foodID, setFoodID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    LoadMenu();
  }, []);

  const LoadMenu = async () => {
    try {
      const result = await axios.get("https://localhost:7264/api/Menu");
      setMenu(result.data);
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Menu", {
        id: id,
        foodID: foodID,
      });
      alert("Save successful!");
      resetForm();
      LoadMenu();
    } catch (err) {
      console.error("Error saving menu:", err);
      alert(err);
    }
  };

  const update = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7264/api/Menu/${id}`, {
        id: id,
        foodID: foodID,
      });
      alert("The menu has been successfully edited.");
      resetForm();
      LoadMenu();
    } catch (err) {
      console.error("Error updating menu:", err);
    }
  };

  const edit = (menu) => {
    setId(menu.id);
    setFoodID(menu.foodID);
    console.log("Update the Menu");
  };

  const deleteMenu = async (id) => {
    try {
      await axios.delete(`https://localhost:7264/api/Menu/${id}`);
      alert("The menu has been successfully deleted!");
      LoadMenu();
    } catch (err) {
      console.error("Error deleting menu:", err);
      alert(err);
    }
  };

  const resetForm = () => {
    setId("");
    setFoodID("");
  };

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  const filteredMenu = menu.filter((menuItem) => {
    return (
      menuItem.id.toString().includes(searchTerm) ||
      menuItem.foodID.toString().includes(searchTerm)
    );
  });

  return (
    <div className="container-fluid" style={{ backgroundColor: "#3f4345", minHeight: "100vh", backgroundSize: "cover" }}>
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        <div className="col-4 col-md-2"></div>
        <div className="col">
          <Nav Toggle={toggleSidebar} />
          <div>
            <h4 className="description">Data for Menu</h4>
            <div className="container mt-4"></div>
            <form>
              <div className="form-group">
                <label className="label">Food Id</label>
                <input type="text" id="id" className="form-control" name="food" value={foodID} onChange={(e) => setFoodID(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success m-4 button" onClick={save}>Save</button>
                <button className="btn btn-warning m-4 button" onClick={update}>Update</button>
              </div>
            </form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

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
                  {filteredMenu.map((menuItem) => (
                    <tr key={menuItem.id}>
                      <td>{menuItem.id}</td>
                      <td>{menuItem.foodID}</td>
                      <td>
                        <div className="button-container">
                          <button type="button" className="btn btn-warning mx-1 button" onClick={() => edit(menuItem)}>Edit</button>
                          <button type="button" className="btn btn-danger mx-1 button" onClick={() => deleteMenu(menuItem.id)}>Delete</button>
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