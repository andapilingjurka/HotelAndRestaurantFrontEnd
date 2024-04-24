import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import register from "./register.jpg";



const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
function Registration() {
  const [Id, setId] = useState("");
  const [FirstName, setName] = useState("");
  const [LastName, setlname] = useState("");
  const [Email, setemail] = useState("");
  const [Password, setpassword] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const [role, setrole] = useState("client");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    if (
      !FirstName.trim() ||
      !LastName.trim() ||
      !Email.trim() ||
      !Password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("Ju lutem plotësoni të gjitha hapësirat e zbrazta!");
      return false;
    }

    if (!isEmailValid(Email)) {
      alert("Formati i email-it nuk është i saktë!");
      return false;
    }

    if (Password !== confirmPassword) {
      alert("Fjalëkalimet nuk përputhen!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7264/api/Users/Register",
        {
          FirstName: FirstName.trim(),
          Email: Email.trim(),
          Password: Password.trim(),
          LastName: LastName.trim(),
          roleId: 2,
        }
      );

      alert("Regjistrimi u krye me sukses");
      setMessage(response.data);
      setId("");
      setName("");
      setlname("");
      setemail("");
      setpassword("");
      setconfirmpassword("");
      setrole("");
    } catch (err) {
      console.error(err);
      alert("Gabim gjatë regjistrimit. Ju lutem provoni përsëri.");
    }
  };

  return (
    <div>
     
      <div className="container d-flex justify-content-center align-items-center min-vh-100 register">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#61c0bf" }}
          >
            <div className="featured-imagee mb-3">
              <img
                src={register}
                className="img-test"
                style={{ width: "100%" }}
                alt="Featured"
              />
            </div>
            <p
              className="text-white fs-2"
              style={{ fontFamily: "Courier New", fontWeight: 600 }}
            >
              Be Verified
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{ width: "17rem", fontFamily: "Courier New" }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Regjistrohuni këtu!</h2>
                <p>Filloni një aventurë me ne.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Emri"
                    value={FirstName}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Mbiemri"
                    value={LastName}
                    onChange={(event) => setlname(event.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email"
                    value={Email}
                    onChange={(event) => setemail(event.target.value)}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Fjalekalimi"
                    value={Password}
                    onChange={(event) => setpassword(event.target.value)}
                  />
                </div>
                <div className="input-group mb-5">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Konfirmo Fjalekalimin"
                    value={confirmPassword}
                    onChange={(event) => setconfirmpassword(event.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 fs-6 btn-register"
                  >
                    Regjistrohuni
                  </button>
                </div>
                <div className="row">
                  <small>
                    Keni tashmë një llogari?<Link to="/login">Kyqu</Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
