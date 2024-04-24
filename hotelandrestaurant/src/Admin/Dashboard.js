import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import React, { useState, useEffect } from "react";
import { FaBed } from "react-icons/fa";
import chart from "../images/chart.png";
import chartsecond from "../images/chart2.png";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

function Dashboard() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle);
  };

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
          <div className="px-3">
            <div className="container-fluid">
              <div className="row g-3 my-2">
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">11,102</h3>{" "}
                      <p className="fs-5">Users</p>
                    </div>
                    <i className="bi bi-people p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">350</h3>{" "}
                      <p className="fs-5">Rooms</p>
                    </div>
                    <FaBed className="fs-4 me-3" size="50px" />
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">8,155</h3>{" "}
                      <p className="fs-5">Bookings</p>
                    </div>
                    <i className="bi bi-card-checklist p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">8,155</h3>{" "}
                      <p className="fs-5">Guests</p>
                    </div>
                    <i className="bi bi-card-checklist p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-xl-3 p-1">
                  <div className="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">289</h3>{" "}
                      <p className="fs-5">Messages</p>
                    </div>
                    <i className="bi bi-chat-dots p-3 fs-1"></i>
                  </div>
                </div>
              </div>

              <div className="row ">
                {/* Left Image */}
                <div className="col-xxl-6">
                  <img
                    src={chart}
                    alt="Left Product Image"
                    className="img-fluid mt-3 rounded"
                    style={{
                      height: "auto",
                      maxHeight: "372px",
                      width: "100%",
                    }}
                  />
                </div>

                {/* Right Image */}
                <div className="col-xxl-6">
                  <img
                    src={chartsecond}
                    alt="Right Product Image"
                    className="img-fluid mt-3 rounded"
                    style={{
                      height: "auto",
                      maxHeight: "372px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
