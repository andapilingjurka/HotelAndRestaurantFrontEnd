import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburger } from "react-icons/gi";
import { FaBed, FaUser, FaUserPlus } from "react-icons/fa";
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
          to="/"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-bar-chart-line fs-5 me-3"></i>{" "}
          <span>Dashboard</span>
        </Link>

        <Link
          to="/role"
          className={`list-group-item py-2 ${
            location.pathname === "/role" ? "active-link" : ""
          }`}
        >
          <FaUserPlus className="fs-5 me-3" /> <span>Roles</span>
        </Link>
        <Link
          to="/users"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/users" ? "active-link" : ""
          }`}
        >
          <FaUser className="fs-5 me-3" />
          <span>Users</span>
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
          to="/home"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/home" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-house fs-5 me-3"></i> <span>Home</span>
        </Link>

        <Link
          to="/stafi"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/stafi" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-people fs-5 me-3"></i> <span>Staff</span>
        </Link>

        <Link
          to="/rewardBonus"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/rewardBonus" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-people fs-5 me-3"></i> <span>RewardBonus</span>
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
          to="/bookings"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/bookings" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-card-checklist fs-5 me-3"></i>
          <span>Bookings</span>
        </Link>

        <Link
          to="/guests"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/guests" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-card-checklist fs-5 me-3"></i>
          <span>Guests</span>
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
          to="/foods"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/foods" ? "active-link" : ""
          }`}
        >
          <GiHamburger className="fs-5 me-3" />
          <span>Food</span>
        </Link>

        <br />
        <br />
      </div>
    </div>
  );
}

export default Sidebar;
