import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburger } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import "../style.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-white sidebar p-2">
      <div className="m-1 logo">
        <span className="brand-name fs-5">Starlight Hotel/Restaurant</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-bar-chart-line fs-5 me-3"></i>{" "}
          <span>Dashboard</span>
        </Link>

        <Link
          to="/"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-house fs-5 me-3"></i> <span>Home</span>
        </Link>

        <Link
          to="/users"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/users" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-people fs-5 me-3"></i> <span>Users</span>
        </Link>

        <Link
          to="/rooms"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/rooms" ? "active-link" : ""
          }`}
        >
          <FaBed className="fs-5 me-3" />
          <span>Rooms</span>
        </Link>

        <Link
          to="/roomtype"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/roomtype" ? "active-link" : ""
          }`}
        >
          <FaBed className="fs-5 me-3" />
          <span>Room Type</span>
        </Link>

        <Link
          to="/reservations"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/reservations" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-card-checklist fs-5 me-3"></i>
          <span>Reservations</span>
        </Link>

        <Link
          to="/roomsoffer"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/roomsoffer" ? "active-link" : ""
          }`}
        >
          <FaBed className="fs-5 me-3" />
          <span>Rooms Offer</span>
        </Link>

        <Link
          to="/reservationsoffer"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/reservationsoffer" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-card-checklist fs-5 me-3"></i>
          <span>Reservations Offer</span>
        </Link>

        <Link
          to="/menu"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/menu" ? "active-link" : ""
          }`}
        >
          <FiMenu className="fs-5 me-3" />
          <span>Menu</span>
        </Link>

        <Link
          to="/food"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/food" ? "active-link" : ""
          }`}
        >
          <GiHamburger className="fs-5 me-3" />
          <span>Food</span>
        </Link>

        <br />
        <br />

        <Link
          to="#"
          className={`list-group-item py-2 rounded ${
            location.pathname === "#" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-gear fs-5 me-3"></i> <span>Settings</span>
        </Link>

        <Link
          to="/logout"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/logout" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-power fs-5 me-3"></i> <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
