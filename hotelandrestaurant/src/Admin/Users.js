import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/Menu/LoginRegister/jwtUtils';


function Users() {
  
  const [toggle, setToggle] = useState(true);
  const [roleid, setRoleid] = useState("");
  const [email, setEmail] = useState("");
  const [editUseri, seteditUseri] = useState("");
  const [perdoruesit, setPerdoruesit] = useState([]);
  const [role, setRoles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };


 
  useEffect(() => {
    Load();
    loadRoles();
  }, []);

//    Kushti per kontrollimin nese eshte admin
//    if (!decodedToken || decodedToken.role !== 'asd') {
//     return (
//       <div className="container">
//  <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman, serif', fontWeight: 'bold',position: 'relative', marginTop:'250px'}}>
//       Ju nuk keni akses në këtë faqe!
//     </h1>  
//           </div>
//     );
//   }

  async function Load() {
    try {
      const result = await axios.get('https://localhost:7264/api/Users/GetAllList');
      setPerdoruesit(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function loadRoles() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Roles/GetAllList"
      );
      setRoles(result.data);
    } catch (err) {
      console.error("Error loading states:", err);
    }
  }


   async function edit(qyteti) {
    seteditUseri(qyteti)
  } 
  async function update(event) {
    event.preventDefault();
    try {
     // const useri = perdoruesit.find((p) => p.id === id);
      await axios.put(`https://localhost:7264/api/Users/Update/${editUseri.id}`, {
        id: editUseri.id,
        firstName: editUseri.firstName,
        lastName: editUseri.lastName,
        email: editUseri.email,
        password: editUseri.password,
        roleId: roleid,
      });
      showAndHideAlert("Perdoruesi është edituar me sukses!");
      seteditUseri("");
      setEmail("");
      
      Load();
      
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://localhost:7264/api/Users/Delete?Id=${id}`);
      showAndHideAlert("Perdoruesi është fshir me sukses!");
     
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
    <h4 className="description">Data for User</h4>
            <div className="container mt-4"></div>
            <form>
     <div className="form-group">
            <label className="label">Email</label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              value={editUseri.email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <select
              className="form-control"
              id="shteti"
              value={roleid}
              onChange={(event) => setRoleid(event.target.value)}
            >
              <option value="">Select a state</option>
              {role.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
           
            <button className="btn btn-warning m-4 button" onClick={update}>
              Update
            </button>
          </div>
          </form>
          
    <br></br>

    {/* Alert Message */}
    {isAlertVisible && (
      <div
        className={`alert ${
          alertMessage.includes("Error") ? "alert-danger" : "alert-success"
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
            <th scope="col">Role</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {perdoruesit.map(function fn(perdoruesi) {
            return (
              <tr key={perdoruesi.id}>
                <td>{perdoruesi.firstName}</td>
                <td>{perdoruesi.lastName}</td>
                <td>{perdoruesi.email}</td>
                <td>{role.find(r => r.id === perdoruesi.roleId)?.name || 'Role not found'}</td>

                 <td className="d-flex align-items-center button-container ">
                  <button
                    type="button"
                    className="btn btn-warning mx-1 button"
                    onClick={() => edit(perdoruesi)}
                  >
                    Edit
                  </button>
                   <button
                    type="button"
                    className="btn btn-danger mx-1 button"
                    onClick={() => handleDelete(perdoruesi.id)}
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
export default Users;