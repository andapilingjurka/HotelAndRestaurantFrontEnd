import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../components/LoginRegister/jwtUtils';

function ContactAdmin() {
  const [toggle, setToggle] = useState(true);
  const [kontakts, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle);
  };


    useEffect(() => {
      Load();
    }, []);

     // Kushti per kontrollimin nese eshte admin
     if (!decodedToken || decodedToken.role !== 'admin') {
      return (
        <div className="container">
         <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman, serif', fontWeight: 'bold',position: 'relative', marginTop:'250px'}}>
         You do not have access to this page!
    </h1>  
        </div>
      );
    }
    //filtering
    async function load() {
        try {
          const result = await axios.get(
            "https://localhost:7264/api/Contact/GetAllFiltering",
            { params: { searchQuery, sortField, isAscending } }
          );
          setUsers(result.data);
        } catch (err) {
          console.error("Error loading cities:", err);
        }
      }
    async function Load() {
      try {
        const result = await axios.get('https://localhost:7264/api/Contact/GetAllList ');
        setUsers(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    async function handleDelete(Id) {
      try {
        await axios.delete(`https://localhost:7264/api/Contact/Delete?Id=${Id}`);
        showAndHideAlert("Kontakti është fshir me sukses!");
       
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
          backgroundColor: "#004687",
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
          <h4 className="description">Contact Information</h4>
          <div className="container mt-4">
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
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Opsionet</th>
                </tr>
              </thead>
              <tbody>
                {kontakts.map(function fn(contact) {
                  return (
                    <tr key={contact.id}>
                      <td>{contact.id}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>

                      <td className="d-flex align-items-center button-container ">
                      <td>
                      <button
                            type="button"
                            className="btn btn-danger mx-1 button"
                            onClick={() => handleDelete(contact.Id)}
                          >
                            Delete
                          </button>             
                           </td>
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
        </div>

      );
    }
    
    export default ContactAdmin;