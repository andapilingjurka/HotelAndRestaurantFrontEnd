import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuCrud from "./Admin/MenuCrud";
import Menu from "./components/Menu/Menu";
import FoodsCrud from "./Admin/FoodsCrud";
import Dashboard from "./Admin/Dashboard";
import RoomTypeAdmin from "./Admin/RoomTypeAdmin";
import RoomAdmin from "./Admin/RoomAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomAdmin />} />
        <Route path="/roomtype" element={<RoomTypeAdmin />} />
        <Route path="/usermenu" element={<Menu />} />
        <Route path="/foods" element={<FoodsCrud />} />
        <Route path="/menu" element={<MenuCrud />} />
      </Routes>
    </Router>
  );
}

export default App;
